import React from "react";
import VariantButton from "../components/VariantButton";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import MealRecommendationCard from "../components/cards/MealRecommendationCard";

const MealRecommendation = () => {
  const dropdownFilters = ["All", "Vegetarian", "Vegan", "Gluten-Free", "Keto"];
  const navigate = useNavigate();
  const navigateto = (path) => {
    navigate(path);
  };
  return (
    <div className="flex flex-col p-4">
      {/* header */}
      <div className="flex items-center flex-col sm:flex-row gap-2 lg:gap-8 lg:m-4">
        <VariantButton
          onClick={() => navigateto("/")}
          size="smsquare"
          variant="outline"
          icon="arrow-left"
        />

        <div className="flex w-full gap-2">
          <div className="lg:w-1/4">
            <SearchBar />
          </div>

          <div>
            <Dropdown options={dropdownFilters} />
          </div>
        </div>
      </div>

      {/* meal recommendations */}
      <div className="p-2 pt-8 md:p-8 lg:p-16 flex flex-wrap gap-8 ">
        <MealRecommendationCard />
        <MealRecommendationCard />
        <MealRecommendationCard />
        <MealRecommendationCard />
        <MealRecommendationCard />
        <MealRecommendationCard />
        <MealRecommendationCard />
        <MealRecommendationCard />
        <MealRecommendationCard />
      </div>
    </div>
  );
};

export default MealRecommendation;
