import React from "react";
import VariantButton from "../components/VariantButton";
import DashboardMealSetCard from "../components/cards/DashboardMealSetCard";
import NutritionTrackerWidget from "../components/cards/NutritionTrackerWidget";
import { MessMenuData } from "../messMenu.data";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const navigateto = (path) => {
    navigate(path);
  };
  return (
    <div className="text-[1rem] p-4 pb-16 flex flex-col md:flex-row gap-8">
      {/* today's menu */}
      <div className="w-full md:w-[30rem] flex flex-col gap-4">
        {/* full screen menu button */}
        <div className="ml-4 mt-4">
          <VariantButton
            onClick={() => navigateto("/mess-menu")}
            size="smsquare"
            variant="outline"
            icon="maximize-2"
          />
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
