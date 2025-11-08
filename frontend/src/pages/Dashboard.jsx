import React from "react";
import VariantButton from "../components/VariantButton";
import DashboardMealSetCard from "../components/cards/DashboardMealSetCard";
import NutritionTrackerWidget from "../components/cards/NutritionTrackerWidget";
import { useNavigate } from "react-router-dom";
import useMessMenu from "../hooks/useMessMenu";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const Dashboard = () => {
  const navigate = useNavigate();
  const navigateto = (path) => navigate(path);

  const { menu, isLoaded, toggleLike, toggleDislike, getLikedItems, resetMenu } =
    useMessMenu(); // default key "menuData"

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
      {/* today's menu */}
      <div className="w-full md:w-[30rem] flex flex-col gap-4">
        <div className="flex items-center justify-between ml-4 mt-4">

          {/* full screen mess menu button */}
          <VariantButton
            onClick={() => navigateto("/mess-menu")}
            size="smsquare"
            variant="outline"
            icon="maximize-2"
          />

          {/* reset preference button */}
          <div className="flex gap-2">
            <button
              onClick={resetMenu}
              className="px-3 py-1 rounded bg-red-500 text-white text-sm"
              title="Reset stored preferences (for demo)"
            >
              Reset Preferences
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 overflow-x-auto p-4">
          <h2 className="text-lg font-semibold">Today&apos;s Menu ({dayKey.toUpperCase()})</h2>

          <DashboardMealSetCard mealSet={mealSetWithHandlers} />
        </div>

        {/* quick liked list for demo */}
        <div className="p-4">
          <h3 className="font-semibold">Liked Items (this week)</h3>
          {likedItems.length === 0 ? (
            <p className="text-sm text-gray-500">No liked items yet.</p>
          ) : (
            <ul className="list-disc list-inside">
              {likedItems.map((it, i) => (
                <li key={i} className="text-sm">
                  {it.day.toUpperCase()} • {it.mealType} • {it.item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* nutrition tracker widget */}
      <div className="mt-8">
        <NutritionTrackerWidget />
      </div>
    </div>
  );
};

export default Dashboard;
