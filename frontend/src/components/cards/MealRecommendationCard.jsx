import React from "react";
import { useNavigate } from "react-router-dom";
import VariantButton from "../VariantButton";

const MealRecommendationCard = () => {
  const navigate = useNavigate();
  const navigateto = (path) => {
    navigate(path);
  };
  return (
    <div className="h-fit max-w-[250px] min-w-[200px] flex-grow-1 rounded-2xl shadow-lg border-card-bg/80 flex flex-col">
      {/* photo */}
      <div className="bg-gray-300 h-[132px] w-full rounded-2xl"></div>

      {/* details */}
      <div className="text-text p-4">
        <div className="font-bold text-center">Tofu</div>
        <div className="flex flex-col m-4 text-[14px] text-secondary-text my-2">
          <div>300kCal</div>
          <div>19g Protein</div>
          <div>15g Carbs</div>
          <div>20g Fat</div>
        </div>

        <div className="w-8/10 my-4 mx-auto">
          <VariantButton
            size="free"
            text="Add to Plan"
            onClick={() => {}}
            variant="ghostCta"
            icon="arrow-right"
          />
        </div>
      </div>
    </div>
  );
};

export default MealRecommendationCard;
