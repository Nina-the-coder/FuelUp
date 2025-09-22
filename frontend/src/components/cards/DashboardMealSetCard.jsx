import React from "react";
import Icon from "../Icon";
import VariantButton from "../VariantButton";

const DashboardMealSetCard = ({ mealSet }) => {
  const MealTypes = ["breakfast", "lunch", "snacks", "dinner"];
  const icons = {
    breakfast: "sun",
    lunch: "moon",
    snacks: "cloud",
    dinner: "star",
  };
  console.log(mealSet);

  return (
    <div className="flex flex-col gap-4">
      {MealTypes.map((meal, i) => (
        <div
          key={i}
          className="w-full h-fit bg-gradient-to-r from-[#b79891]/80 to-[#94716b]/60 to rounded-2xl shadow-lg"
        >
          {/* header */}
          <div className="flex items-center px-4 pt-4 gap-4">
            <Icon name={icons[meal]} className="h-[24px] w-[24px]" />
            <div className="text-[18px] font-bold">{meal}</div>
          </div>
          {/* body */}
          <div className="flex flex-col w-full gap-2 p-4">
            {/* food items */}
            {mealSet[meal].map((item, index) => (
              <div key={index} className="flex justify-between gap-4  px-4">
                <div>{item.name}</div>
                <div className="flex gap-4">
                  <VariantButton
                    size="tiny"
                    variant={`${item.liked === true ? "cta" : "ghostCta"}`}
                    icon="thumbs-up"
                  />
                  <VariantButton
                    size="tiny"
                    variant={`${item.disliked === true ? "red" : "ghostRed"}`}
                    icon="thumbs-down"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMealSetCard;
