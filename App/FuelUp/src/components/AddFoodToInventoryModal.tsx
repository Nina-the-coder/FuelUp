import React, { useEffect } from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { Colors } from "../theme/colors";

interface AddFoodToInventoryModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  name: string;
  setName: (name: string) => void;
  baseQuantity: string;
  setBaseQuantity: (quantity: string) => void;
  unit: "g" | "ml" | "pcs";
  setUnit: (unit: "g" | "ml" | "pcs") => void;
  calories: string;
  setCalories: (calories: string) => void;
  protein: string;
  setProtein: (protein: string) => void;
  carbs: string;
  setCarbs: (carbs: string) => void;
  fats: string;
  setFats: (fats: string) => void;
  handleAddInventory: () => void;
  isEditing?: boolean;
}

const AddFoodToInventoryModal = ({
  modalVisible,
  setModalVisible,
  name,
  setName,
  baseQuantity,
  setBaseQuantity,
  unit,
  setUnit,
  calories,
  setCalories,
  protein,
  setProtein,
  carbs,
  setCarbs,
  fats,
  setFats,
  handleAddInventory,
  isEditing = false,
}: AddFoodToInventoryModalProps) => {
  // baseQuantity = (unit === "pcs" ? "1" : "100");

  useEffect(() => {
    if (!modalVisible) return;

    if (unit === "pcs" && baseQuantity === "100") {
      setBaseQuantity("1");
    }
  }, [unit]);

  return (
    <Modal visible={modalVisible} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <ScrollView showsVerticalScrollIndicator={false} >
          {/* TITLE */} 
          <Text style={styles.title}>
            {isEditing ? "Edit Inventory Item" : "New Inventory Item"}
          </Text>

          {/* NAME */}
          <Text style={styles.label}>Food Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Base Quantity</Text>
          {/* BASE QUANTITY */}
          <TextInput
            placeholder="Base Quantity (e.g., 100)"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="numeric"
            style={styles.input}
            value={baseQuantity}
            onChangeText={setBaseQuantity}
          />

          <Text style={styles.label}>Unit</Text>
          {/* UNIT SELECTOR */}
          <View style={styles.unitContainer}>
            {(["g", "ml", "pcs"] as const).map((u) => (
              <TouchableOpacity
                key={u}
                style={[
                  styles.unitButton,
                  unit === u && styles.unitButtonActive,
                ]}
                onPress={() => setUnit(u)}
              >
                <Text
                  style={[styles.unitText, unit === u && styles.unitTextActive]}
                >
                  {u}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Calories</Text>
          {/* MACROS */}
          <TextInput
            placeholder="0"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="numeric"
            style={styles.input}
            value={calories}
            onChangeText={setCalories}
          />

          <Text style={styles.label}>Protein</Text>
          <TextInput
            placeholder="0"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="numeric"
            style={styles.input}
            value={protein}
            onChangeText={setProtein}
            />

          <Text style={styles.label}>Carbs</Text>
          <TextInput
            placeholder="0"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="numeric"
            style={styles.input}
            value={carbs}
            onChangeText={setCarbs}
          />

          <Text style={styles.label}>Fats</Text>
          <TextInput
            placeholder="0"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="numeric"
            style={styles.input}
            value={fats}
            onChangeText={setFats}
          />

          <View style={[styles.actionButtons]}>
            {/* CANCEL BUTTON */}
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* SAVE BUTTON */}
            <TouchableOpacity
              style={[styles.button]}
              onPress={handleAddInventory}
            >
              <Text style={styles.buttonText}>
                {isEditing ? "Update Item" : "Save Item"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{height : 300}}></View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default AddFoodToInventoryModal;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingVertical: 60,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 20,
  },

  input: {
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    color: Colors.textPrimary,
    fontSize: 14,
  },

  label: {
    color: Colors.textSecondary,
    marginLeft: 8,
    marginBottom: 4,
  },

  unitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  unitButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: Colors.card,
    alignItems: "center",
  },

  unitButtonActive: {
    backgroundColor: Colors.primary,
  },

  unitText: {
    color: Colors.textPrimary,
    fontWeight: "500",
  },

  unitTextActive: {
    color: "#fff",
  },

  actionButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
    padding: 12,
  },

  button: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 2,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },

  cancelButton: {
    borderColor: Colors.danger,
    flex: 1,
  },

  cancelButtonText: {
    color: Colors.danger,
    fontWeight: "600",
    fontSize: 15,
  },
});
