import React, { useState, useMemo, useEffect } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "../theme/colors";
import { useNutrition } from "../context/NutritionContext";
import uuid from "react-native-uuid";

/* ================= INTERFACES ================= */

interface FoodItem {
  id: string;
  name: string;
  baseQuantity: number;
  unit: "g" | "ml" | "pcs";
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MakeFoodEntryModalProps {
  visible: boolean;
  onClose: () => void;
}

interface QuickChipProps {
  label: string;
  onPress: () => void;
}

export default function MakeFoodEntryModal({
  visible,
  onClose,
}: MakeFoodEntryModalProps) {
  const { inventory, addFoodToActiveLog } = useNutrition();

  const [step, setStep] = useState<"select" | "edit">("select");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [customName, setCustomName] = useState("");
  const [quantity, setQuantity] = useState("100");

  const [editMacros, setEditMacros] = useState(false);

  const [customBaseRatios, setCustomBaseRatios] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  /* =========================
     Debounce Search
  ========================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredInventory = useMemo(() => {
    if (!debouncedSearch) return inventory;

    return inventory.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, inventory]);

  /* =========================
     Handle Selection
  ========================= */

  const handleSelectItem = (item: FoodItem) => {
    setSelectedItem(item);
    setCustomName(item.name);
    setSearch(item.name);

    setQuantity(item.unit === "pcs" ? "1" : "100");

    setCustomBaseRatios({
      calories: item.calories / item.baseQuantity,
      protein: item.protein / item.baseQuantity,
      carbs: item.carbs / item.baseQuantity,
      fats: item.fats / item.baseQuantity,
    });

    setStep("edit");
  };

  /* =========================
     Dynamic Macros
  ========================= */

  const currentQty = Number(quantity) || 0;

  const currentMacros = {
    calories: Math.round(customBaseRatios.calories * currentQty),
    protein: Math.round(customBaseRatios.protein * currentQty),
    carbs: Math.round(customBaseRatios.carbs * currentQty),
    fats: Math.round(customBaseRatios.fats * currentQty),
  };

  /* =========================
     Save & Reset
  ========================= */

  const handleAddFood = () => {
    if (!selectedItem) return;
    if (currentQty <= 0) {
      alert("Invalid food quantity");
      return;
    }

    addFoodToActiveLog({
      id: uuid.v4().toString(),
      name: customName || selectedItem.name,
      quantity: currentQty,
      unit: selectedItem.unit,
      ...currentMacros,
    });

    reset();
    onClose();
  };

  const reset = () => {
    setStep("select");
    setSearch("");
    setSelectedItem(null);
    setCustomName("");
    setQuantity("100");
    setEditMacros(false);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Text style={styles.title}>Select Food</Text>

          {/* STEP 1 - SELECT (No longer inside ScrollView so FlatList scrolls perfectly) */}
          {step === "select" && (
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="Search food..."
                placeholderTextColor={Colors.textSecondary}
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
                autoFocus={true} // <-- Immediately opens keyboard
              />

              <FlatList
                data={filteredInventory}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="handled" // <-- Allows tapping item while keyboard is up
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelectItem(item)}
                  >
                    <Text style={styles.foodName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />

              {/* Cancel Button at bottom of search list */}
              <TouchableOpacity
                style={[
                  styles.secondaryButton,
                  { marginTop: 10, marginBottom: 20, flex: 0 },
                ]}
                onPress={() => {
                  reset();
                  onClose();
                }}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 2 - EDIT (Wrapped in ScrollView for taller content) */}
          {step === "edit" && selectedItem && (
            <ScrollView
              contentContainerStyle={{ flexGrow: 0, paddingBottom: 300 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* food name label and input */}
              <Text style={styles.sectionLabel}>Food Name</Text>
              <TextInput
                value={customName}
                onChangeText={setCustomName}
                style={styles.input}
              />

              {/* quantity label and input field */}
              <Text style={styles.sectionLabel}>
                Quantity ({selectedItem.unit})
              </Text>
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.stepButton}
                  onPress={() =>
                    setQuantity(
                      String(
                        Math.max(
                          0,
                          currentQty - (selectedItem.unit === "pcs" ? 1 : 10),
                        ),
                      ),
                    )
                  }
                >
                  <Text style={styles.stepText}>
                    {selectedItem.unit === "pcs" ? "-1" : "-10"}
                  </Text>
                </TouchableOpacity>

                <TextInput
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={setQuantity}
                  style={styles.quantityInput}
                />

                <TouchableOpacity
                  style={styles.stepButton}
                  onPress={() =>
                    setQuantity(
                      String(
                        currentQty + (selectedItem.unit === "pcs" ? 1 : 10),
                      ),
                    )
                  }
                >
                  <Text style={styles.stepText}>
                    {selectedItem.unit === "pcs" ? "+1" : "+10"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* chips to add food qty quickly */}
              <View style={styles.quickRow}>
                {selectedItem.unit === "g" || selectedItem.unit === "ml" ? (
                  <>
                    <QuickChip
                      label="+50"
                      onPress={() => setQuantity(String(currentQty + 50))}
                    />
                    <QuickChip
                      label="+100"
                      onPress={() => setQuantity(String(currentQty + 100))}
                    />
                    <QuickChip
                      label="1 Serving"
                      onPress={() =>
                        setQuantity(String(selectedItem.baseQuantity))
                      }
                    />
                  </>
                ) : (
                  <>
                    <QuickChip
                      label="+1"
                      onPress={() => setQuantity(String(currentQty + 1))}
                    />
                    <QuickChip
                      label="+2"
                      onPress={() => setQuantity(String(currentQty + 2))}
                    />
                    <QuickChip
                      label="1 Serving"
                      onPress={() =>
                        setQuantity(String(selectedItem.baseQuantity))
                      }
                    />
                  </>
                )}
              </View>

              {/* adjusting macro toggle button */}
              <TouchableOpacity
                onPress={() => setEditMacros(!editMacros)}
                style={{ marginTop: 16 }}
              >
                <Text style={{ color: Colors.primary, textAlign: "right" }}>
                  {editMacros
                    ? "Hide Macro Adjustment"
                    : "Adjust Macros (Optional)"}
                </Text>
              </TouchableOpacity>

              {/* macro editing input fields */}
              {editMacros && (
                <View style={{ marginTop: 10 }}>
                  {(["calories", "protein", "carbs", "fats"] as const).map(
                    (key) => (
                      <View key={key}>
                        <Text style={styles.macroLabel}>{key}</Text>
                        <TextInput
                          keyboardType="numeric"
                          value={String(currentMacros[key])}
                          onChangeText={(val) => {
                            const newTotal = Number(val) || 0;
                            setCustomBaseRatios((prev) => ({
                              ...prev,
                              [key]: currentQty > 0 ? newTotal / currentQty : 0,
                            }));
                          }}
                          style={[styles.input, { marginBottom: 10 }]}
                        />
                      </View>
                    ),
                  )}
                </View>
              )}

              {/* preview */}
              <View style={styles.preview}>
                <View>
                  <Text style={styles.previewLabel}>Calories</Text>
                  <Text style={styles.previewLabel}>Protein</Text>
                  <Text style={styles.previewLabel}>Carbs</Text>
                  <Text style={styles.previewLabel}>Fats</Text>
                </View>
                <View>
                  <Text style={styles.previewText}>
                    {currentMacros.calories} kcal
                  </Text>
                  <Text style={styles.previewText}>
                    {currentMacros.protein}g
                  </Text>
                  <Text style={styles.previewText}>{currentMacros.carbs}g</Text>
                  <Text style={styles.previewText}>{currentMacros.fats}g</Text>
                </View>
              </View>

              {/* action buttons */}
              <View
                style={{ flexDirection: "row", gap: 10, marginTop: "auto" }}
              >
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    reset();
                    onClose();
                  }}
                >
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleAddFood}
                >
                  <Text style={styles.primaryButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const QuickChip = ({ label, onPress }: QuickChipProps) => (
  <TouchableOpacity style={styles.quickChip} onPress={onPress}>
    <Text style={styles.quickChipText}>{label}</Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 14,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 14,
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 8,
  },
  foodName: {
    color: Colors.textPrimary,
  },
  sectionLabel: {
    marginTop: 15,
    marginBottom: 6,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  input: {
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 12,
    color: Colors.textPrimary,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityInput: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 12,
    textAlign: "center",
    color: Colors.textPrimary,
    fontSize: 16,
  },
  stepButton: {
    height: 45,
    borderRadius: 12,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  stepText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: "600",
  },
  preview: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.card,
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 14,
    marginTop: 15,
    marginBottom: 20,
  },
  previewLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  previewText: {
    color: Colors.textPrimary,
    fontWeight: "500",
  },
  macroLabel: {
    color: Colors.textSecondary,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  quickRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  quickChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: Colors.card,
  },
  quickChipText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: "600",
  },
  primaryButton: {
    borderColor: Colors.primary,
    flex: 1,
    borderWidth: 2,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  secondaryButton: {
    borderColor: Colors.danger,
    flex: 1,
    borderWidth: 2,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  primaryButtonText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButtonText: {
    color: Colors.danger,
    fontWeight: "600",
    fontSize: 16,
  },
});
