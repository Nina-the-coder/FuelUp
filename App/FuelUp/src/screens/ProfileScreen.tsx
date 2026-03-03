import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNutrition } from "../context/NutritionContext";
import { Colors } from "../theme/colors";

export default function ProfileScreen({ navigation }: any) {
  const { profile, goals } = useNutrition();

  const getGoalColor = () => {
    if (!profile) return Colors.primary;

    switch (profile.goalType) {
      case "gain":
        return "#2ecc71";
      case "lose":
        return "#e74c3c";
      case "maintain":
        return "#f39c12";
      default:
        return Colors.primary;
    }
  };

  /* ================= EMPTY STATE ================= */

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Profile Found</Text>
          <Text style={styles.emptySubtitle}>
            Set up your profile to calculate your macro goals.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("MacroCalculator")}
          >
            <Text style={styles.buttonText}>Setup Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* ================= MAIN SCREEN ================= */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Text style={styles.title}>Profile</Text>

        {/* SUMMARY CARD */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View>
              <Text style={styles.profileMain}>
                {profile.gender === "male" ? "Male" : "Female"}
              </Text>
              <Text style={styles.profileSub}>
                {profile.age} yrs • {profile.height} cm • {profile.weight} kg
              </Text>
            </View>

            <View
              style={[styles.goalBadge, { backgroundColor: getGoalColor() }]}
            >
              <Text style={styles.goalText}>
                {profile.goalType.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* MACROS CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Daily Targets</Text>

          <View style={styles.macroGrid}>
            <MacroCard value={goals.calories} label="Calories" />
            <MacroCard value={`${goals.protein}g`} label="Protein" />
            <MacroCard value={`${goals.carbs}g`} label="Carbs" />
            <MacroCard value={`${goals.fats}g`} label="Fats" />
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("MacroCalculator")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= MACRO CARD ================= */

const MacroCard = ({ value, label }: any) => (
  <View style={styles.macroCard}>
    <Text style={styles.macroValue}>{value}</Text>
    <Text style={styles.macroLabel}>{label}</Text>
  </View>
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
    paddingBottom: 200,
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
    padding: 22,
    marginBottom: 26,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profileMain: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  profileSub: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 6,
  },

  goalBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  goalText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 0.5,
  },

  sectionLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 18,
    color: Colors.textSecondary,
  },

  macroGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  macroCard: {
    width: "48%",
    backgroundColor: Colors.background,
    borderRadius: 18,
    paddingVertical: 24,
    marginBottom: 16,
    alignItems: "center",
  },

  macroValue: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
  },

  macroLabel: {
    marginTop: 6,
    fontSize: 13,
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

  /* EMPTY STATE */

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
});
