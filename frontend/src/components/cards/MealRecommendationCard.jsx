// MealRecommendationCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import VariantButton from "../VariantButton";

/**
 * Props:
 *  - meal: { name, tags?, nutrition: { calories, protein, carbs, fats }, image? }
 *  - onAdd?: (meal) => void
 *  - onView?: (meal) => void
 *  - compact?: boolean (ignored — cards are unified size now)
 *
 * Note: demo images are fetched from picsum.photos using a seed derived from the meal name.
 *       If you prefer Unsplash or local assets, swap the fallbackImageUrl.
 */

const MealRecommendationCard = ({ meal = {}, onAdd, onView }) => {
  const navigate = useNavigate();

  const {
    name = "Unknown meal",
    tags = [],
    nutrition = { calories: 0, protein: 0, carbs: 0, fats: 0 },
    image,
  } = meal;

  const slugify = (s = "") =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const fallbackImageUrl = (() => {
    // stable image per meal using picsum.photos seed.
    // format: https://picsum.photos/seed/<seed>/400/300
    const seed = encodeURIComponent(
      slugify(name) || Math.random().toString(36).slice(2, 8)
    );
    return `https://picsum.photos/seed/${seed}/400/300`;
  })();

  const imageUrl = image || fallbackImageUrl;

  const handleView = () => {
    if (typeof onView === "function") return onView(meal);
    navigate(`/meals/${slugify(name)}`);
  };

  const handleAdd = () => {
    if (typeof onAdd === "function") return onAdd(meal);
    console.warn("onAdd not provided — implement to persist suggestion", meal);
  };

  const isSuggested = Array.isArray(tags) && tags.includes("suggested");

  return (
    <article
      className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
                 w-[250px] h-[360px] transition-transform transform hover:-translate-y-1"
      role="article"
      aria-label={`Meal recommendation: ${name}`}
    >
      {/* IMAGE BLOCK: fixed height so all cards align */}
      <div className="relative h-[160px] w-full bg-gray-100 flex-shrink-0">
        {/* image */}
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* suggested badge */}
        {isSuggested && (
          <span className="absolute left-3 top-3 inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Suggested
          </span>
        )}

        {/* calories chip */}
        <div className="absolute right-3 top-3 inline-flex items-center gap-2">
          <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur">
            {Math.round(nutrition.calories ?? 0)} kcal
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 flex-1 flex flex-col">
        <h3
          className="text-sm md:text-base font-semibold text-gray-900 truncate"
          title={name}
        >
          {name}
        </h3>

        {/* nutrition line */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600 mt-2">
          <span className="px-2 py-1 rounded-full bg-gray-50">
            {Math.round(nutrition.protein ?? 0)}g P
          </span>
          <span className="px-2 py-1 rounded-full bg-gray-50">
            {Math.round(nutrition.carbs ?? 0)}g C
          </span>
          <span className="px-2 py-1 rounded-full bg-gray-50">
            {Math.round(nutrition.fats ?? 0)}g F
          </span>
        </div>

        {/* tags */}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-3">
            {tags.slice(0, 4).map((t, i) => (
              <span
                key={i}
                className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="text-xs text-gray-500 self-center">
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* spacer so actions stay at the bottom */}
        <div className="flex-1" />

        {/* actions (aligned bottom) */}
        <div className="my-2 flex gap-2">
          <VariantButton
            size="small"
            onClick={handleAdd}
            text={isSuggested ? "Add to Plan" : "Add"}
            variant={isSuggested ? "cta" : "ghostCta"}
            icon="plus"
            aria-label={`add-${name}`}
            className="flex-1"
          />

          {/* <VariantButton
            size="free"
            onClick={handleView}
            text="View"
            variant="ghost"
            icon="eye"
            aria-label={`view-${name}`}
            className="w-[78px]"
          /> */}
        </div>
      </div>
    </article>
  );
};

export default MealRecommendationCard;
