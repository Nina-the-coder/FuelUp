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

  return (
    <div className="flex flex-col gap-4">
      {MealTypes.map((meal, i) => {
        const items = mealSet?.[meal] || [];
        return (
          <div
            key={i}
            className="w-full h-fit bg-gradient-to-r from-[#b79891]/80 to-[#94716b]/60 rounded-2xl shadow-lg"
          >
            {/* header */}
            <div className="flex items-center px-4 pt-4 gap-4">
              <Icon name={icons[meal]} className="h-[24px] w-[24px]" />
              <div className="text-[18px] font-bold capitalize">{meal}</div>
            </div>

            {/* body */}
            <div className="flex flex-col w-full gap-2 p-4">
              {items.length === 0 && (
                <div className="text-sm text-gray-500 px-4">No items</div>
              )}

              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-4 px-4 items-center py-2"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {item.nutrition?.calories !== undefined && (
                      <div className="text-xs text-gray-600">
                        {item.nutrition.calories} kcal • {item.tags?.join(", ")}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <VariantButton
                      size="tiny"
                      onClick={item.onLike}
                      variant={item.liked === true ? "cta" : "ghostCta"}
                      icon="thumbs-up"
                      aria-label={`like-${item.name}`}
                    />
                    <VariantButton
                      size="tiny"
                      onClick={item.onDislike}
                      variant={item.disliked === true ? "red" : "ghostRed"}
                      icon="thumbs-down"
                      aria-label={`dislike-${item.name}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardMealSetCard;
