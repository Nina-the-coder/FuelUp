import React, { useState, useMemo } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";
import { useNutrition } from "../context/NutritionContext";
import DailyFoodListCard from "../components/DailyFoodListCard";
import FloatingButton from "../components/FloatingButton";
import MakeFoodEntryModal from "../components/MakeFoodEntryModal";

export default function HomeScreen() {
  const { dailyLogs, activeLogId, setActiveLogId, goals, profile } =
    useNutrition();

  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "7" | "30">("30");

  /* =========================
     Filter Logic
  ========================= */

  const filteredLogs = useMemo(() => {
    const sorted = [...dailyLogs].sort((a, b) => b.date.localeCompare(a.date));

    if (filter === "all") return sorted;

    const days = filter === "7" ? 7 : 30;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return sorted.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= cutoff;
    });
  }, [dailyLogs, filter]);

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.logoRow}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      <Text style={styles.title}>Daily Logs</Text>
      </View>

      {/* ===== FILTERS ===== */}
      <View style={styles.filterRow}>
        <FilterButton
          label="All"
          value="all"
          active={filter}
          onPress={setFilter}
        />
        <FilterButton
          label="7 Days"
          value="7"
          active={filter}
          onPress={setFilter}
        />
        <FilterButton
          label="30 Days"
          value="30"
          active={filter}
          onPress={setFilter}
        />
      </View>

      {/* food entries */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredLogs.map((log) => (
          <DailyFoodListCard
            key={log.id}
            item={log}
            activeLogId={activeLogId}
            setActiveLogId={setActiveLogId}
            goals={goals}
            profile={profile}
          />
        ))}
      </ScrollView>

      <MakeFoodEntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <FloatingButton onPress={() => setModalVisible(true)} />
    </SafeAreaView>
  );
}

const FilterButton = ({ label, value, active, onPress }: any) => {
  const isActive = active === value;

  return (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.filterActive]}
      onPress={() => onPress(value)}
    >
      <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingBottom: 60,
  },

  /* ===== HEADER ===== */
  
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 50,
    height: 50,
    marginBottom: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.primary,
    paddingTop: 10,
    marginBottom: 15,
  },

  /* ===== FILTERS ===== */

  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    // justifyContent: "center",
  },

  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: Colors.card,
  },

  filterActive: {
    backgroundColor: Colors.primary,
  },

  filterText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  filterTextActive: {
    color: Colors.textPrimary,
    fontWeight: "600",
  },
});
