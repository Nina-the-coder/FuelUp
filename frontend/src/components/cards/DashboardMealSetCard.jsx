import React from "react";
import Icon from "../Icon";
import VariantButton from "../VariantButton";

/**
 * DashboardMealSetCard
 * - Renders breakfast, lunch, snacks, dinner (and any extra keys like "suggestions")
 * - Shows a "Suggested" badge for items with tag "suggested"
 * - Renders up to 3 extra tag pills (besides "suggested")
 */
const DashboardMealSetCard = ({ mealSet = {} }) => {
  const DEFAULT_ORDER = ["breakfast", "lunch", "snacks", "dinner"];
  // discover extra keys (e.g. suggestions) and preserve order
  const extras = Object.keys(mealSet || {}).filter((k) => !DEFAULT_ORDER.includes(k));
  const MealTypes = [...DEFAULT_ORDER, ...extras];

  const icons = {
    breakfast: "sun",
    lunch: "moon",
    snacks: "cloud",
    dinner: "star",
    suggestions: "sparkles",
  };

  return (
    <div className="flex flex-col gap-4">
      {MealTypes.map((meal, i) => {
        const items = mealSet?.[meal] || [];
        // skip empty groups (optional). If you want to always show, remove this.
        // but keep the header visible even if zero items for suggestions too — here we show it even if empty.
        return (
          <div
            key={meal + "-" + i}
            className="w-full h-fit rounded-2xl shadow-lg overflow-hidden bg-gradient-to-r from-[#b79891]/80 to-[#94716b]/60"
          >
            {/* header */}
            <div className="flex items-center px-4 pt-4 gap-4">
              <div className="flex items-center justify-center h-9 w-9 rounded-md bg-white/20">
                <Icon name={icons[meal] || "dish"} className="h-[20px] w-[20px] text-white" />
              </div>
              <div className="text-[18px] font-bold capitalize text-black">{meal}</div>
              <div className="ml-auto text-sm text-black/80">{items.length > 0 ? `${items.length} item${items.length>1?'s':''}` : "No items"}</div>
            </div>

            {/* body */}
            <div className="flex flex-col w-full gap-2 p-4 bg-white/5">
              {items.length === 0 && (
                <div className="text-sm text-black/80 px-4 py-2">No items</div>
              )}

              {items.map((item, index) => {
                const isSuggested = Array.isArray(item.tags) && item.tags.includes("suggested");
                // show up to 3 non-suggested tags as pills
                const visibleTags = (item.tags || []).filter((t) => t !== "suggested").slice(0, 3);

                return (
                  <div
                    key={`${meal}-${index}-${item.name}`}
                    className={`flex justify-between gap-4 px-4 items-center py-2 rounded-md ${isSuggested ? "bg-black/10" : "bg-black/0"}`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-black truncate">{item.name}</div>
                        {isSuggested && (
                          <span className="ml-1 inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            Suggested
                          </span>
                        )}
                      </div>

                      {item.nutrition?.calories !== undefined && (
                        <div className="mt-1 text-xs text-black/75 flex items-center gap-2">
                          <span>{item.nutrition.calories} kcal</span>
                          {visibleTags.length > 0 && (
                            <span className="flex gap-1 items-center">
                              {visibleTags.map((t, ti) => (
                                <span key={ti} className="text-xs text-black/90 bg-black/10 px-2 py-0.5 rounded-full">{t}</span>
                              ))}
                              {/* if there are more tags than shown, show +n */}
                              { (item.tags || []).length - (isSuggested ? visibleTags.length + 1 : visibleTags.length) > 0 && (
                                <span className="text-xs text-black/70">+{(item.tags || []).length - (isSuggested ? visibleTags.length + 1 : visibleTags.length)}</span>
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 items-center">
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
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardMealSetCard;
