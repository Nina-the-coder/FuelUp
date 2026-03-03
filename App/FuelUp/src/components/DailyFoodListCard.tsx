import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Colors } from "../theme/colors";
import { DailyLog, NutritionGoals } from "../types/models";
import { useNutrition } from "../context/NutritionContext";

interface Props {
  item: DailyLog;
  activeLogId: string | null;
  setActiveLogId: (id: string) => void;
  goals: NutritionGoals;
  profile: {
    goalType: "lose" | "maintain" | "gain";
  } | null;
}

export default function DailyFoodListCard({
  item,
  activeLogId,
  setActiveLogId,
  goals,
  profile,
}: Props) {
  const { removeFoodFromActiveLog } = useNutrition();

  /* ================= TOTALS ================= */

  const totals = item.entries.reduce(
    (acc, entry) => {
      acc.calories += entry.calories;
      acc.protein += entry.protein;
      acc.carbs += entry.carbs;
      acc.fats += entry.fats;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 },
  );

  const isActive = item.id === activeLogId;

  /* ================= GOAL CHECK ================= */
  const isGoalMet = useMemo(() => {
    if (!profile) return false;

    // 1. Establish realistic tolerances
    // +/- 5% for calories (tracking is never 100% accurate)
    const calTolerance = goals.calories * 0.05;

    // Allow users to be up to 5g under their protein goal and still "pass"
    const hasHitProtein = totals.protein >= goals.protein - 5;

    switch (profile.goalType) {
      case "lose":
        // Must be under target, but no more than 20% under (prevents under-eating)
        const minLoseCals = goals.calories * 0.8;
        return (
          totals.calories >= minLoseCals &&
          totals.calories <= goals.calories + calTolerance &&
          hasHitProtein
        );

      case "maintain":
        // Must be exactly within the +/- 5% window
        return (
          Math.abs(totals.calories - goals.calories) <= calTolerance &&
          hasHitProtein
        );

      case "gain":
        // Must be over target, but no more than 20% over (prevents dirty bulking)
        const maxGainCals = goals.calories * 1.2;
        return (
          totals.calories >= goals.calories - calTolerance &&
          totals.calories <= maxGainCals &&
          hasHitProtein
        );

      default:
        return false;
    }
  }, [totals, goals, profile]);

  /* ================= PROGRESS ================= */

  const getCalorieColor = () => {
    if (!profile) return Colors.primary;

    switch (profile.goalType) {
      case "gain":
        return totals.calories >= goals.calories
          ? Colors.primary
          : Colors.danger;
      case "lose":
        return totals.calories <= goals.calories
          ? Colors.primary
          : Colors.danger;
      case "maintain":
        const tolerance = goals.calories * 0.05;
        return Math.abs(totals.calories - goals.calories) <= tolerance
          ? Colors.primary
          : Colors.danger;
      default:
        return Colors.primary;
    }
  };

  const renderProgressBar = (value: number, goal: number, color: string) => {
    const progress = goal > 0 ? Math.min((value / goal) * 100, 100) : 0;

    return (
      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%`, backgroundColor: color },
          ]}
        />
      </View>
    );
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1.04 : 1,
      useNativeDriver: true,
      friction: 7,
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => setActiveLogId(item.id)}
    >
      <Animated.View
        style={[
          styles.card,
          isActive && styles.activeCard,
          {
            transform: [{ scale: scaleAnim }],
            borderTopColor: isGoalMet ? Colors.primary : Colors.danger,
          },
        ]}
      >
        {/* DATE BADGE */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </View>

        <View style={styles.container}>
          {/* LEFT SIDE */}
          <View style={styles.foodList}>
            {item.entries.map((food) => (
              <View key={food.id} style={styles.foodRow}>
                <Text style={styles.foodItem}>
                  • {food.name} ({food.quantity}
                  {food.unit})
                </Text>

                {isActive && (
                  <TouchableOpacity
                    onPress={() => removeFoodFromActiveLog(food.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          {/* RIGHT SIDE */}
          <View style={styles.summaryContainer}>
            {isActive ? (
              <>
                <Text style={styles.label}>
                  Calories : {totals.calories} / {goals.calories}
                </Text>
                {renderProgressBar(
                  totals.calories,
                  goals.calories,
                  getCalorieColor(),
                )}

                <Text style={styles.label}>
                  Protein : {totals.protein} / {goals.protein}g
                </Text>
                {renderProgressBar(
                  totals.protein,
                  goals.protein,
                  totals.protein >= goals.protein
                    ? Colors.primary
                    : Colors.danger,
                )}

                <Text style={styles.label}>
                  Carbs : {totals.carbs} / {goals.carbs}g
                </Text>
                {renderProgressBar(totals.carbs, goals.carbs, Colors.primary)}

                <Text style={styles.label}>
                  Fats : {totals.fats} / {goals.fats}g
                </Text>
                {renderProgressBar(totals.fats, goals.fats, Colors.primary)}
              </>
            ) : (
              <>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Calories</Text>
                  <Text style={styles.summaryValue}>
                    {totals.calories} kcal
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Protein</Text>
                  <Text style={styles.summaryValue}>{totals.protein} g</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Carbs</Text>
                  <Text style={styles.summaryValue}>{totals.carbs} g</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Fats</Text>
                  <Text style={styles.summaryValue}>{totals.fats} g</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: Colors.card,
    borderTopWidth: 4,
    padding: 18,
    borderRadius: 16,
  },

  activeCard: {
    backgroundColor: Colors.activeCard,
    opacity: 1,
    shadowColor: "#000",
    shadowOpacity: 0.95,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: 40,
  },

  dateBadge: {
    position: "absolute",
    top: -12,
    right: 24,
    backgroundColor: Colors.textSecondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  dateText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.background,
  },

  container: {
    flexDirection: "row",
    marginTop: 10,
  },

  foodList: {
    flex: 3,
    paddingRight: 16,
  },

  foodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 6,
    paddingRight: 24,
  },

  foodItem: {
    color: Colors.textPrimary,
    fontSize: 14,
    marginBottom: 6,
    width: "100%",
  },

  removeButton: {
    paddingHorizontal: 6,
  },

  removeText: {
    color: Colors.danger,
    fontSize: 13,
    fontWeight: "600",
  },

  summaryContainer: {
    flex: 2,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  summaryLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
  },

  summaryValue: {
    color: Colors.textPrimary,
    fontWeight: "600",
    fontSize: 13,
  },

  label: {
    marginTop: 8,
    fontSize: 11,
    color: Colors.textSecondary,
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#2a2a2a",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 4,
  },

  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
});
