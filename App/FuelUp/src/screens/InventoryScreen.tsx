import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Swipeable } from "react-native-gesture-handler";
import { Colors } from "../theme/colors";
import { useNutrition } from "../context/NutritionContext";
import uuid from "react-native-uuid";
import FloatingButton from "../components/FloatingButton";
import AddFoodToInventoryModal from "../components/AddFoodToInventoryModal";

export default function InventoryScreen() {
  const {
    inventory,
    addInventoryItem,
    removeInventoryItem,
    updateInventoryItem,
  } = useNutrition();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [deleteModeId, setDeleteModeId] = useState<string | null>(null);

  useEffect(() => {
    if (!modalVisible) {
      resetForm();
    }
  }, [modalVisible]);

  /* ================= SEARCH ================= */

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  /* ================= SORT ================= */

  type SortField = "name" | "calories" | "protein" | "carbs" | "fats" | null;

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredInventory = useMemo(() => {
    let result = inventory.filter((item) =>
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );

    if (sortField) {
      result = [...result].sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (typeof valueA === "string") {
          return sortDirection === "asc"
            ? valueA.localeCompare(valueB as string)
            : (valueB as string).localeCompare(valueA);
        }

        return sortDirection === "asc"
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number);
      });
    }

    return result;
  }, [inventory, debouncedQuery, sortField, sortDirection]);

  /* ================= FORM STATE ================= */

  const [name, setName] = useState("");
  const [baseQuantity, setBaseQuantity] = useState("100");
  const [unit, setUnit] = useState<"g" | "ml" | "pcs">("g");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const resetForm = () => {
    setName("");
    setBaseQuantity("100");
    setUnit("g");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
    setEditingItemId(null);
  };

  /* ================= ADD / EDIT ================= */

  const handleSave = () => {
    if (!name.trim()) return;
    if(Number(calories) < 0 || Number(protein) < 0 || Number(carbs) < 0 || Number(fats) < 0){
      alert("You cannot have -ve macro values");
      return;
    }

    const foodData = {
      id: editingItemId ?? uuid.v4().toString(),
      name: name.trim(),
      baseQuantity: Number(baseQuantity),
      unit,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fats: Number(fats) || 0,
    };

    if (editingItemId) {
      updateInventoryItem(foodData);
    } else {
      addInventoryItem(foodData);
    }

    resetForm();
    setModalVisible(false);
  };

  const handleEdit = (item: any) => {
    setEditingItemId(item.id);
    setName(item.name);
    setBaseQuantity(String(item.baseQuantity));
    setUnit(item.unit);
    setCalories(String(item.calories));
    setProtein(String(item.protein));
    setCarbs(String(item.carbs));
    setFats(String(item.fats));
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Inventory</Text>

      {/* SEARCH BAR */}
      <TextInput
        placeholder="Search food..."
        placeholderTextColor={Colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {/* FILTER BAR */}
      <View style={styles.filterRow}>
        {[
          { label: "Name", field: "name" },
          { label: "Cal", field: "calories" },
          { label: "P", field: "protein" },
          { label: "C", field: "carbs" },
          { label: "F", field: "fats" },
        ].map((item) => (
          <TouchableOpacity
            key={item.field}
            style={[
              styles.filterButton,
              sortField === item.field && styles.filterActive,
            ]}
            onPress={() => {
              if (sortField === item.field) {
                // Toggle only if same field clicked again
                setSortDirection(sortDirection === "desc" ? "asc" : "desc");
              } else {
                setSortField(item.field as SortField);

                // Default logic:
                if (item.field === "name") {
                  setSortDirection("asc"); // A → Z
                } else {
                  setSortDirection("desc"); // Highest → Lowest
                }
              }
            }}
          >
            <Text
              style={[
                styles.filterText,
                sortField === item.field && styles.filterTextActive,
              ]}
            >
              {item.label}
              {sortField === item.field
                ? sortDirection === "asc"
                  ? " ↑"
                  : " ↓"
                : ""}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Clear */}
        {sortField && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSortField(null)}
          >
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredInventory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setDeleteModeId(null);
              handleEdit(item);
            }}
            onLongPress={() =>
              setDeleteModeId(deleteModeId === item.id ? null : item.id)
            }
          >
            <View style={styles.card}>
              {/* Header */}
              <View style={styles.headerColumn}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.perText}>
                  per {item.baseQuantity}
                  {item.unit}
                </Text>
              </View>

              {/* Compact Macro Row */}
              <View style={styles.macroColumn}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.macroText}>{item.calories} kcal</Text>
                  <Text style={styles.macroText}>C : {item.carbs}g</Text>
                </View>
                <View>
                  <Text style={styles.macroText}>P : {item.protein}g</Text>
                  <Text style={styles.macroText}>F : {item.fats}g</Text>
                </View>
              </View>

              {deleteModeId === item.id && (
                <TouchableOpacity
                  style={styles.inlineDelete}
                  onPress={() => {
                    removeInventoryItem(item.id);
                    setDeleteModeId(null);
                  }}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No matching inventory items.</Text>
        }
      />

      <AddFoodToInventoryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        name={name}
        setName={setName}
        baseQuantity={baseQuantity}
        setBaseQuantity={setBaseQuantity}
        unit={unit}
        setUnit={setUnit}
        calories={calories}
        setCalories={setCalories}
        protein={protein}
        setProtein={setProtein}
        carbs={carbs}
        setCarbs={setCarbs}
        fats={fats}
        setFats={setFats}
        handleAddInventory={handleSave}
        isEditing={!!editingItemId}
      />

      <FloatingButton onPress={() => setModalVisible(true)} />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: Colors.card,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  headerColumn: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  macroColumn: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },

  perText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: "500",
  },

  macroText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  inlineDelete: {
    // position: "absolute",
    // right: 10,
    // top: 10,
    backgroundColor: Colors.danger,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: "center",
  },

  deleteText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.primary,
    paddingTop: 10,
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    color: Colors.textPrimary,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 10,
  },

  filterButton: {
    backgroundColor: Colors.card,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
  },

  filterActive: {
    backgroundColor: Colors.primary,
  },

  filterText: {
    fontSize: 14,
    color: Colors.textSecondary,
    minWidth: 30,
    textAlign: "center",
  },

  filterTextActive: {
    color: "#fff",
  },

  clearButton: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },

  clearText: {
    color: "#fff",
    fontSize: 12,
  },
  swipeAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    borderRadius: 14,
    marginBottom: 12,
  },
  swipeText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 20,
  },
});
