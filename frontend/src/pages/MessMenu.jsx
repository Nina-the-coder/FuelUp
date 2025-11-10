// src/pages/MessMenu.jsx
import React, { useState } from "react";
import VariantButton from "../components/VariantButton";
import DayButton from "../components/DayButton";
import FoodCard from "../components/cards/FoodCard";
import { useNavigate } from "react-router-dom";
import useMessMenu from "../hooks/useMessMenu";

const MealTypes = ["breakfast", "lunch", "snacks", "dinner"];
const Days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const MessMenu = () => {
  const navigate = useNavigate();
  const navigateto = (path) => {
    navigate(path);
  };

  const [activeDay, setActiveDay] = useState("sun");

  // Hook provides menu + actions (persisted in localStorage)
  const { menu, isLoaded, toggleLike, toggleDislike, resetMenu } =
    useMessMenu();

  if (!isLoaded) return <div className="p-4">Loading menu...</div>;

  // Guard: if selected day doesn't exist in menu, fallback to first key
  const safeDay = menu[activeDay] ? activeDay : Object.keys(menu)[0];

  // Get the day's meal object safely
  const dayMeals = menu[safeDay] || {
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  };

  // Compute nutrition totals for the day's meals
  const totals = MealTypes.reduce(
    (acc, mealType) => {
      const arr = dayMeals[mealType] || [];
      arr.forEach((it) => {
        const n = it.nutrition || {};
        acc.calories += Number(n.calories || 0);
        acc.protein += Number(n.protein || 0);
        acc.carbs += Number(n.carbs || 0);
        acc.fats += Number(n.fats || 0);
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <div className="p-4">
      {/* header */}
      <div className="w-fit flex items-center flex-col sm:flex-row gap-4 lg:m-4">
        <div className="mr-8">
          <VariantButton
            onClick={() => navigateto("/")}
            size="smsquare"
            variant="outline"
            icon="arrow-left"
          />
        </div>

        <div className="flex gap-4 w-fit justify-center md:justify-start">
          {Days.map((day, index) => (
            <DayButton
              key={index}
              day={day.charAt(0).toUpperCase() + day.slice(1, 3)}
              isSelected={day === activeDay}
              onClick={() => setActiveDay(day)}
            />
          ))}
        </div>

        <div className="w-full ml-8">
          <button
            onClick={() => {
              resetMenu();
              // keep UI stable on reset (resetMenu writes to storage & hook updates menu)
            }}
            className="px-3 h-10 py-1 rounded hover:cursor-pointer bg-red-500 text-white text-sm"
            title="Reset stored preferences"
          >
            Reset Preferences
          </button>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row w-full h-full">
        {/* meals display */}
        <div className="flex flex-col gap-8 p-4 lg:w-2/3">
          {MealTypes.map((meal, index) => (
            <div key={index} className="flex flex-col">
              <div className="text-[18px] p-2 px-8 ml-8 mt-2 font-bold border bg-bg rounded-2xl shadow-md w-fit">
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </div>

              <div className="flex gap-4 overflow-x-auto p-4 flex-wrap">
                {(dayMeals[meal] || []).map((item, idx) => {
                  // Provide handlers & pass liked/disliked props so FoodCard can use them
                  const onLike = () => toggleLike(safeDay, meal, idx);
                  const onDislike = () => toggleDislike(safeDay, meal, idx);

                  return (
                    <FoodCard
                      key={idx}
                      foodItem={item}
                      onLike={onLike}
                      onDislike={onDislike}
                      // pass metadata for card to render stateful UI
                      liked={!!item.liked}
                      disliked={!!item.disliked}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* nutrition summary */}
        <div className="bg-green/70 h-fit w-fit p-4 md:p-8 text-[14px] md:text-[16px] rounded-2xl shadow-lg m-4 flex flex-col gap-2">
          <div className="font-bold text-[16px] md:text-[20px]">
            {safeDay.toUpperCase()}'s Nutrition Summary
          </div>
          <div className="h-0 w-full border my-2 md:mt-2 md:mb-4"></div>
          <div>- Calories: {totals.calories}</div>
          <div>- Protein: {totals.protein} g</div>
          <div>- Carbs: {totals.carbs} g</div>
          <div>- Fats: {totals.fats} g</div>
        </div>
      </div>
    </div>
  );
};

export default MessMenu;
