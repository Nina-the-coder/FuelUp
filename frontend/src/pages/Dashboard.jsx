import React from "react";
import VariantButton from "../components/VariantButton";
import Icon from "../components/Icon";
import DashboardMealSetCard from "../components/cards/DashboardMealSetCard";
import NutritionTrackerWidget from "../components/cards/NutritionTrackerWidget";
import { MessMenuData } from "../messMenu.data";

const Dashboard = () => {
  return (
    <div className="text-[1rem] p-4 flex flex-col md:flex-row gap-8">
      {/* today's menu */}
      <div className="w-full md:w-[30rem] flex flex-col gap-4">
        {/* full screen menu button */}
        <div className="ml-8">
          <VariantButton size="smsquare" variant="outline" icon="maximize-2" />
        </div>

        {/* meal cards */}
        <div className="flex flex-col w-full gap-4 overflow-x-auto p-4">
            <DashboardMealSetCard mealSet={MessMenuData["sun"]} />
        </div>
      </div>

      {/* nutrition tracker */}
      <div className="mt-8">
        <NutritionTrackerWidget />
      </div>
    </div>
  );
};

export default Dashboard;
