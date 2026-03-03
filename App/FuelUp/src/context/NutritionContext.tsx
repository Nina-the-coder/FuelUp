import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  InventoryItem,
  DailyFoodEntry,
  NutritionGoals,
  DailyLog,
  ProfileData,
  Unit,
} from "../types/models";
import { saveData, getData } from "../utils/storage";
import { getTodayDate } from "../utils/date";
import { defaultInventory } from "../data/defaultInventory";

interface NutritionContextType {
  inventory: InventoryItem[];
  addInventoryItem: (item: InventoryItem) => void;

  dailyLogs: DailyLog[];
  activeLogId: string | null;
  setActiveLogId: (id: string | null) => void;
  createNewLog: () => void;
  addFoodToActiveLog: (entry: DailyFoodEntry) => void;

  goals: NutritionGoals;
  setGoals: (goals: NutritionGoals) => void;

  profile: ProfileData | null;
  saveProfileAndGoals: (profile: ProfileData, macros: NutritionGoals) => void;
  removeFoodFromActiveLog: (entryId: string) => void;
  removeInventoryItem: (id: string) => void;
  updateInventoryItem: (item: InventoryItem) => void;
}

const STORAGE_KEYS = {
  INVENTORY: "FUELUP_INVENTORY",
  DAILY_LOGS: "FUELUP_DAILY_LOGS",
  ACTIVE_LOG: "FUELUP_ACTIVE_LOG",
  GOALS: "FUELUP_GOALS",
  PROFILE: "FUELUP_PROFILE",
};

const defaultGoals: NutritionGoals = {
  calories: 2500,
  protein: 120,
  carbs: 300,
  fats: 70,
};

const NutritionContext = createContext<NutritionContextType | undefined>(
  undefined,
);

export const NutritionProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [activeLogId, setActiveLogId] = useState<string | null>(null);
  const [goals, setGoals] = useState<NutritionGoals>(defaultGoals);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const storedInventory = await getData(STORAGE_KEYS.INVENTORY);
      const storedLogs = await getData(STORAGE_KEYS.DAILY_LOGS);
      const storedActiveLog = await getData(STORAGE_KEYS.ACTIVE_LOG);
      const storedGoals = await getData(STORAGE_KEYS.GOALS);
      const storedProfile = await getData(STORAGE_KEYS.PROFILE);

      if (storedInventory) setInventory(storedInventory);
      if (storedLogs) setDailyLogs(storedLogs);
      if (storedActiveLog) setActiveLogId(storedActiveLog);
      if (storedGoals) setGoals(storedGoals);
      if (storedProfile) setProfile(storedProfile);

      setIsLoaded(true); // 🔥 important guard
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    saveData(STORAGE_KEYS.INVENTORY, inventory);
  }, [inventory, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    saveData(STORAGE_KEYS.DAILY_LOGS, dailyLogs);
  }, [dailyLogs, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    saveData(STORAGE_KEYS.ACTIVE_LOG, activeLogId);
  }, [activeLogId, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    saveData(STORAGE_KEYS.GOALS, goals);
  }, [goals, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    saveData(STORAGE_KEYS.PROFILE, profile);
  }, [profile, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const today = getTodayDate();
    const todayLog = dailyLogs.find((log) => log.date === today);

    if (!todayLog) {
      const newLog: DailyLog = {
        id: today + "-" + Date.now(),
        date: today,
        entries: [],
      };

      setDailyLogs((prev) => [...prev, newLog]);
      setActiveLogId(newLog.id);
    } else if (activeLogId !== todayLog.id) {
      setActiveLogId(todayLog.id);
    }
  }, [isLoaded, dailyLogs.length]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!inventory || inventory.length === 0) {
      const inventoryItems: InventoryItem[] = defaultInventory.map((item) => ({
        ...item,
        unit: item.unit as Unit,
      }));

      setInventory(inventoryItems);
    }
  }, [isLoaded]);

  const addInventoryItem = (item: InventoryItem) => {
    setInventory((prev) => [...prev, item]);
  };

  const createNewLog = () => {
    const today = getTodayDate();

    const newLog: DailyLog = {
      id: today + "-" + Date.now(),
      date: today,
      entries: [],
    };

    setDailyLogs((prev) => [...prev, newLog]);
    setActiveLogId(newLog.id);
  };

  const removeFoodFromActiveLog = (entryId: string) => {
    if (!activeLogId) return;

    setDailyLogs((prev) =>
      prev.map((log) =>
        log.id === activeLogId
          ? {
              ...log,
              entries: log.entries.filter((e) => e.id !== entryId),
            }
          : log,
      ),
    );
  };

  const addFoodToActiveLog = (entry: DailyFoodEntry) => {
    if (!activeLogId) return;

    setDailyLogs((prev) =>
      prev.map((log) =>
        log.id === activeLogId
          ? { ...log, entries: [...log.entries, entry] }
          : log,
      ),
    );
  };

  const removeInventoryItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const updateInventoryItem = (updatedItem: InventoryItem) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  const saveProfileAndGoals = (
    profileData: ProfileData,
    macroGoals: NutritionGoals,
  ) => {
    setProfile(profileData);
    setGoals(macroGoals);
  };

  return (
    <NutritionContext.Provider
      value={{
        inventory,
        addInventoryItem,
        dailyLogs,
        activeLogId,
        setActiveLogId,
        createNewLog,
        addFoodToActiveLog,
        goals,
        setGoals,
        profile,
        saveProfileAndGoals,
        removeFoodFromActiveLog,
        removeInventoryItem,
        updateInventoryItem,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error("useNutrition must be used within NutritionProvider");
  }
  return context;
};
