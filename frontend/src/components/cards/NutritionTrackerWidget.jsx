// NutritionTrackerWidget.jsx
import React from "react";

/**
 * Props:
 *  - consumed: { calories, protein, carbs, fats } (numbers)
 *  - target:   { calories, protein, carbs, fats } (numbers)
 *
 * Renders 4 progress bars (Calories, Carbs, Fat, Protein).
 * Safe with missing/zero values.
 */
const NutritionTrackerWidget = ({ consumed = {}, target = {} }) => {
  const takenVal = (k) => Math.round((consumed?.[k] ?? 0) * 1); // round
  const totalVal = (k) => Math.round((target?.[k] ?? 0) * 1);

  console.log("NutritionTrackerWidget - consumed:", consumed, " target:", target);

  const metricConfig = [
    { key: "calories", label: "Calories", unit: "cals", colorClass: "bg-green-500" },
    { key: "carbs", label: "Carbs", unit: "g", colorClass: "bg-red-500" },
    { key: "fats", label: "Fat", unit: "g", colorClass: "bg-yellow-500" },
    { key: "protein", label: "Protein", unit: "g", colorClass: "bg-blue-500" },
  ];

  const getWidth = (taken, total) => {
    if (!total || total <= 0) return "0%";
    const pct = Math.min(100, Math.max(0, (taken / total) * 100));
    return `${pct.toFixed(1)}%`;
  };

  return (
    <div className="text-[16px] h-fit p-6 shadow-lg rounded-[20px] bg-white">
      <div className="text-[1.1rem] text-gray-700 font-medium mb-4">NUTRITION PROGRESS</div>

      <div className="flex flex-col gap-4">
        {metricConfig.map((m) => {
          const taken = takenVal(m.key);
          const total = totalVal(m.key);
          return (
            <div key={m.key} className="md:w-[20rem]">
              <div className="flex w-full justify-between px-2 mb-1 text-sm text-gray-700">
                <div>{m.label}</div>
                <div>{taken} / {total} {m.unit}</div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`${m.colorClass} h-2.5 rounded-full`}
                  style={{ width: getWidth(taken, total) }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionTrackerWidget;
