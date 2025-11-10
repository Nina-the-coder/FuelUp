import React from "react";
import VariantButton from "../components/VariantButton";
import DashboardMealSetCard from "../components/cards/DashboardMealSetCard";
import NutritionTrackerWidget from "../components/cards/NutritionTrackerWidget";
import { useNavigate } from "react-router-dom";
import useMessMenu from "../hooks/useMessMenu";
import MealPlannerDemo from "../components/MealPlannerDemo";
import { recMeals } from "../recommendedMeals";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const Dashboard = () => {
  const navigate = useNavigate();
  const navigateto = (path) => navigate(path);

  const {
    menu,
    isLoaded,
    toggleLike,
    toggleDislike,
    getLikedItems,
    resetMenu,
  } = useMessMenu(); // default key "menuData"

  const targets = { calories: 2000, protein: 60, carbs: 200, fats: 40 };

  if (!isLoaded) return <div>Loading menu...</div>;

  const today = new Date();
  const dayKey = DAY_KEYS[today.getDay()] || "sun";

  const todayMealSet = menu[dayKey] || menu[Object.keys(menu)[0]];

  const mealSetWithHandlers = {};
  ["breakfast", "lunch", "snacks", "dinner"].forEach((mealType) => {
    const arr = (todayMealSet && todayMealSet[mealType]) || [];
    mealSetWithHandlers[mealType] = arr.map((item, idx) => ({
      ...item,
      onLike: () => toggleLike(dayKey, mealType, idx),
      onDislike: () => toggleDislike(dayKey, mealType, idx),
    }));
  });

  // quick liked items for demo
  const likedItems = getLikedItems();

  return (
    <div className="text-[1rem] p-4 pb-16 flex flex-col md:flex-row gap-8">
      <MealPlannerDemo
        initialDayMeals={menu["sun"]}
        recMeals={recMeals}
        targets={targets}
      />
    </div>
  );
};

export default Dashboard;
