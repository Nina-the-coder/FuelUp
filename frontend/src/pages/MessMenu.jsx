import React, { useState } from "react";
import VariantButton from "../components/VariantButton";
import DayButton from "../components/DayButton";
import FoodCard from "../components/FoodCard";
import { MessMenuData } from "../messMenu.data";
import { useNavigate } from "react-router-dom";

const MessMenu = () => {
  const navigate = useNavigate();
  const navigateto = (path) => {
    navigate(path);
  };
  const MealTypes = ["breakfast", "lunch", "snacks", "dinner"];
  const Days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const [activeDay, setActiveDay] = useState("sun");

  return (
    <div className="p-4">
      {/* header */}
      <div className="w-full flex items-center flex-col sm:flex-row gap-4 lg:m-4">
        <div className="mr-8">
          <VariantButton
            onClick={() => navigateto("/")}
            size="smsquare"
            variant="outline"
            icon="arrow-left"
          />
        </div>
        <div className="flex gap-4 w-full justify-center md:justify-start">
          {Days.map((day, index) => (
            <DayButton
              key={index}
              day={day.charAt(0).toUpperCase() + day.slice(1, 3)}
              isSelected={day === activeDay}
              onClick={() => setActiveDay(day)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row w-full h-full">
        {/* meals display */}
        <div className="flex flex-col gap-8 p-4 lg:w-2/3">
          {MealTypes.map((meal, index) => (
            <div key={index} className="flex flex-col">
              {/* <div className="w-full h-0 border"></div> */}
              <div className="text-[18px] p-2 px-8 ml-8 mt-2 font-bold border bg-bg rounded-2xl shadow-md w-fit">
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </div>
              {/* <div className="w-full h-0 border"></div> */}
              <div className="flex gap-4 overflow-x-auto p-4 flex-wrap">
                {MessMenuData[activeDay][meal].map((item, index) => (
                  <FoodCard key={index} foodItem={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* nutrition summary */}
        <div className="bg-green/70 h-fit w-fit p-4 md:p-8 text-[14px] md:text-[16px] rounded-2xl shadow-lg m-4 flex flex-col gap-2">
          <div className="font-bold text-[16px] md:text-[20px]">
            Today's Nutrition Summary
          </div>
          <div className="h-0 w-full border my-2 md:mt-2 md:mb-4"></div>
          <div>- Calories: 2000</div>
          <div>- Protein: 150g</div>
          <div>- Carbs: 250g</div>
          <div>- Fats: 70g</div>
        </div>
      </div>
    </div>
  );
};

export default MessMenu;
