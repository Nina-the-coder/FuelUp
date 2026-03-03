import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNutrition } from "../context/NutritionContext";
import { Colors } from "../theme/colors";

export default function MacroCalculatorScreen({ navigation }: any) {
  const { profile, saveProfileAndGoals } = useNutrition();

  const [age, setAge] = useState(profile?.age ?? 20);
  const [gender, setGender] = useState<"male" | "female">(
    profile?.gender ?? "male",
  );
  const [height, setHeight] = useState(profile?.height ?? 170);
  const [weight, setWeight] = useState(profile?.weight ?? 70);
  const [activityLevel, setActivityLevel] = useState<
    "sedentary" | "light" | "moderate" | "very" | "athlete"
  >(profile?.activityLevel ?? "moderate");
  const [goalType, setGoalType] = useState<"lose" | "maintain" | "gain">(
    profile?.goalType ?? "maintain",
  );

  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  /* ================= AUTO CALCULATE ================= */

  useEffect(() => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      athlete: 1.9,
    };

    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    let tdee = bmr * activityMultipliers[activityLevel];

    // Smarter Surplus / Deficit
    if (goalType === "lose") tdee -= 300;
    if (goalType === "gain") tdee += 250;

    const targetCalories = Math.round(tdee);

    // Smarter Protein Logic
    let proteinPerKg = 1.6;
    if (goalType === "lose") proteinPerKg = 2.0;
    if (goalType === "gain") proteinPerKg = 1.7;

    const calcProtein = Math.round(weight * proteinPerKg);

    // Smarter Fat Logic
    const calcFats = Math.round(weight * 0.9);

    const remainingCalories = targetCalories - calcProtein * 4 - calcFats * 9;

    const calcCarbs = Math.round(remainingCalories / 4);

    setCalories(targetCalories);
    setProtein(calcProtein);
    setFats(calcFats);
    setCarbs(calcCarbs);
  }, [age, gender, height, weight, activityLevel, goalType]);

  /* ================= SAVE ================= */

  const handleSave = () => {
    saveProfileAndGoals(
      { age, gender, height, weight, activityLevel, goalType },
      { calories, protein, carbs, fats },
    );

    navigation.goBack();
  };

  /* ================= UI ================= */

return (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backCircle}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Macro Calculator</Text>

          {/* PROFILE CARD */}
          <View style={styles.card}>
            <InputField label="Age" value={age} onChange={setAge} />
            <InputField
              label="Height"
              value={height}
              onChange={setHeight}
              suffix="cm"
            />
            <InputField
              label="Weight"
              value={weight}
              onChange={setWeight}
              suffix="kg"
            />
          </View>

          {/* ACTIVITY CARD */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Activity Level</Text>
            <View style={styles.selectionRow}>
              {["sedentary", "light", "moderate", "very", "athlete"].map(
                (level) => (
                  <SelectionButton
                    key={level}
                    label={level}
                    selected={activityLevel === level}
                    onPress={() => setActivityLevel(level as any)}
                  />
                )
              )}
            </View>
          </View>

          {/* GOAL CARD */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Goal</Text>
            <View style={styles.selectionRow}>
              {["lose", "maintain", "gain"].map((goal) => (
                <SelectionButton
                  key={goal}
                  label={goal}
                  selected={goalType === goal}
                  onPress={() => setGoalType(goal as any)}
                />
              ))}
            </View>
          </View>

          {/* MACROS CARD */}
          <View style={styles.card}>
            <MacroSlider
              label="Calories"
              value={calories}
              min={1200}
              max={4500}
              step={50}
              onChange={setCalories}
            />
            <MacroSlider
              label="Protein"
              value={protein}
              min={50}
              max={300}
              step={5}
              onChange={setProtein}
            />
            <MacroSlider
              label="Carbs"
              value={carbs}
              min={50}
              max={500}
              step={5}
              onChange={setCarbs}
            />
            <MacroSlider
              label="Fats"
              value={fats}
              min={20}
              max={150}
              step={1}
              onChange={setFats}
            />
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
}

/* ================= MACRO SLIDER ================= */

const MacroSlider = ({ label, value, min, max, step, onChange }: any) => (
  <View style={styles.sliderContainer}>
    <Text style={styles.sliderLabel}>
      {label}: {value}
    </Text>

    <Slider
      minimumValue={min}
      maximumValue={max}
      step={step}
      value={value}
      onValueChange={onChange}
      minimumTrackTintColor={Colors.primary}
      maximumTrackTintColor="#333"
      thumbTintColor={Colors.primary}
    />
  </View>
);

const InputField = ({ label, value, onChange, suffix }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(value)}
        onChangeText={(v) => onChange(Number(v))}
      />
      {suffix && <Text style={styles.suffix}>{suffix}</Text>}
    </View>
  </View>
);


  const SelectionButton = ({ label, selected, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.selectionButton, selected && styles.selectionButtonActive]}
    >
      <Text
        style={[styles.selectionText, selected && styles.selectionTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingBottom: 60,
  },

  scrollContent: {
    // paddingHorizontal: 22,
    // paddingTop: 10,
    paddingBottom: 200,
  },

  /* Back Button */
  backCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  backArrow: {
    fontSize: 22,
    color: Colors.textPrimary,
    marginTop: -2,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.primary,
    paddingTop: 10,
    marginBottom: 15,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    padding: 20,
    marginBottom: 26,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  sectionLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 14,
    color: Colors.textSecondary,
  },

  inputContainer: {
    marginBottom: 18,
  },

  inputLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  input: {
    flex: 1,
    fontSize: 17,
    color: Colors.textPrimary,
  },

  suffix: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  selectionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  selectionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },

  selectionButtonActive: {
    backgroundColor: Colors.primary,
  },

  selectionText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textTransform: "capitalize",
  },

  selectionTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  sliderContainer: {
    marginBottom: 24,
  },

  sliderLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.textSecondary,
  },

  primaryButton: {
    borderColor: Colors.primary,
    borderWidth: 2,
    padding: 18,
    borderRadius: 20,
    marginHorizontal: 22,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
});
