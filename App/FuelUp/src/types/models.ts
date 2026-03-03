export type Unit = 'g' | 'ml' | 'pcs';

export interface InventoryItem {
  id: string;
  name: string;
  baseQuantity: number;
  unit: Unit;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DailyFoodEntry {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}


export interface DailyLog {
  id: string;
  date: string;
  entries: DailyFoodEntry[];
}

export interface ProfileData {
  age: number;
  gender: "male" | "female";
  height: number;
  weight: number;
  activityLevel: "sedentary" | "light" | "moderate" | "very" | "athlete";
  goalType: "lose" | "maintain" | "gain";
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}
