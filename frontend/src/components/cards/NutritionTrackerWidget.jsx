import React from "react";

const NutritionTrackerWidget = () => {
  const items = {
    Calories: { taken: 399, total: 1444 },
    Carbs: { taken: 29, total: 217 },
    Fat: { taken: 21, total: 40 },
    Protein: { taken: 24, total: 54 },
  };

  const getWidth = (taken, total) =>
    `${((taken / total) * 100).toFixed(1)}%`;

  return (
    <div className="text-[16px] h-fit p-8 shadow-lg shadow-secondary-text/90 rounded-[24px]">
      <div className="text-[1.2rem] text-secondary-text font-light mb-4">
        NINA PROGRESS
      </div>

      <div className="flex flex-col gap-3">
        {/* Calories */}
        <div className="md:w-[20rem]">
          <div className="flex w-full justify-between px-2 mb-1">
            <div>Calories</div>
            <div>{items.Calories.taken} / {items.Calories.total} cals</div>
          </div>
          <div className="w-full bg-card-bg rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full"
                 style={{ width: getWidth(items.Calories.taken, items.Calories.total) }} />
          </div>
        </div>

        {/* Carbs */}
        <div className="md:w-[20rem]">
          <div className="flex w-full justify-between px-2 mb-1">
            <div>Carbs</div>
            <div>{items.Carbs.taken} / {items.Carbs.total} g</div>
          </div>
          <div className="w-full bg-card-bg rounded-full h-2.5">
            <div className="bg-red-500 h-2.5 rounded-full"
                 style={{ width: getWidth(items.Carbs.taken, items.Carbs.total) }} />
          </div>
        </div>

        {/* Fat */}
        <div className="md:w-[20rem]">
          <div className="flex w-full justify-between px-2 mb-1">
            <div>Fat</div>
            <div>{items.Fat.taken} / {items.Fat.total} g</div>
          </div>
          <div className="w-full bg-card-bg rounded-full h-2.5">
            <div className="bg-yellow-500 h-2.5 rounded-full"
                 style={{ width: getWidth(items.Fat.taken, items.Fat.total) }} />
          </div>
        </div>

        {/* Protein */}
        <div className="md:w-[20rem]">
          <div className="flex w-full justify-between px-2 mb-1">
            <div>Protein</div>
            <div>{items.Protein.taken} / {items.Protein.total} g</div>
          </div>
          <div className="w-full bg-card-bg rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full"
                 style={{ width: getWidth(items.Protein.taken, items.Protein.total) }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTrackerWidget;
