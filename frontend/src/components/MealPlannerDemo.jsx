// MealPlanner.jsx
import React, { useMemo, useState } from "react";
import VariantButton from "../components/VariantButton";
import DashboardMealSetCard from "../components/cards/DashboardMealSetCard";
import useMessMenu from "../hooks/useMessMenu";
import NutritionTrackerWidget from "./cards/NutritionTrackerWidget";
import Icon from "./Icon";

/*
  If you pass `initialDayMeals` prop it'll use that.
  Otherwise it uses useMessMenu() (same as Dashboard) and shows the styled Today's Menu.
*/

// ---------------------- Planner Logic (unchanged) ----------------------
const DEFAULT_CONFIG = {
  likedMultiplier: 1.25,
  dislikedMultiplier: 0.15,
  maxSuggestionItems: 3,
};

function flattenDayMeals(dayMeals) {
  const categories = Object.keys(dayMeals || {});
  const out = [];
  for (const cat of categories) {
    const arr = dayMeals[cat] || [];
    for (const item of arr) {
      out.push({
        ...item,
        id: `${cat}::${item.name}`,
        category: cat,
      });
    }
  }
  return out;
}

function isSatisfied(rem) {
  return (
    rem.calories <= 0 && rem.protein <= 0 && rem.carbs <= 0 && rem.fats <= 0
  );
}
const safeDiv = (a, b) => (b === 0 ? 0 : a / b);

function applyPrefsToItem(item, cfg) {
  let mult = 1;
  if (item.liked) mult = cfg.likedMultiplier;
  if (item.disliked) mult = cfg.dislikedMultiplier;
  return {
    ...item,
    effectiveNutrition: {
      calories: (item.nutrition?.calories || 0) * mult,
      protein: (item.nutrition?.protein || 0) * mult,
      carbs: (item.nutrition?.carbs || 0) * mult,
      fats: (item.nutrition?.fats || 0) * mult,
    },
  };
}

function computeConsumedFromDay(flatMeals, targets, cfg) {
  const consumed = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  const plan = [];
  for (const item of flatMeals) {
    const eff = item.effectiveNutrition;
    consumed.calories += eff.calories;
    consumed.protein += eff.protein;
    consumed.carbs += eff.carbs;
    consumed.fats += eff.fats;
    plan.push({
      id: item.id,
      name: item.name,
      category: item.category,
      countedAs: item.liked ? "liked" : item.disliked ? "disliked" : "default",
    });
  }

  const remaining = {
    calories: Math.max(0, Math.round(targets.calories - consumed.calories)),
    protein: Math.max(0, Math.round(targets.protein - consumed.protein)),
    carbs: Math.max(0, Math.round(targets.carbs - consumed.carbs)),
    fats: Math.max(0, Math.round(targets.fats - consumed.fats)),
  };

  return {
    plan,
    consumed: { ...consumed },
    remaining,
    satisfied: isSatisfied({
      calories: targets.calories - consumed.calories,
      protein: targets.protein - consumed.protein,
      carbs: targets.carbs - consumed.carbs,
      fats: targets.fats - consumed.fats,
    }),
  };
}

function suggestFromRec(recMeals, remaining, cfg) {
  const combos = [];

  function combosOf(arr, k) {
    const out = [];
    function rec(start, cur) {
      if (cur.length === k) {
        out.push(cur.slice());
        return;
      }
      for (let i = start; i < arr.length; i++) {
        cur.push(arr[i]);
        rec(i + 1, cur);
        cur.pop();
      }
    }
    rec(0, []);
    return out;
  }

  const maxK = Math.min(cfg.maxSuggestionItems, recMeals.length);
  for (let k = 1; k <= maxK; k++) {
    const combs = combosOf(recMeals, k);
    for (const comb of combs) {
      const total = comb.reduce(
        (acc, it) => {
          acc.calories += it.nutrition?.calories || 0;
          acc.protein += it.nutrition?.protein || 0;
          acc.carbs += it.nutrition?.carbs || 0;
          acc.fats += it.nutrition?.fats || 0;
          return acc;
        },
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
      );

      const fracCal = Math.min(
        1,
        safeDiv(total.calories, Math.max(1, remaining.calories))
      );
      const fracProt = Math.min(
        1,
        safeDiv(total.protein, Math.max(1, remaining.protein))
      );
      const fracCarb = Math.min(
        1,
        safeDiv(total.carbs, Math.max(1, remaining.carbs))
      );
      const fracFats = Math.min(
        1,
        safeDiv(total.fats, Math.max(1, remaining.fats))
      );

      const score = fracCal + fracProt + fracCarb + fracFats;
      combos.push({ comb, total, score });
    }
  }
  combos.sort((a, b) => b.score - a.score);
  return combos.slice(0, 3).map((c) => ({
    meals: c.comb.map((m) => ({
      name: m.name,
      nutrition: m.nutrition,
      tags: m.tags || [],
    })),
    total: c.total,
    score: Number(c.score.toFixed(2)),
  }));
}

export function planMealsFrontend({
  dayMeals,
  recMeals = [],
  targets,
  config = {},
}) {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const flat = flattenDayMeals(dayMeals).map((item) =>
    applyPrefsToItem(item, cfg)
  );
  const dayResult = computeConsumedFromDay(flat, targets, cfg);

  if (dayResult.satisfied) {
    return {
      success: true,
      plan: dayResult.plan,
      consumed: dayResult.consumed,
      remaining: { calories: 0, protein: 0, carbs: 0, fats: 0 },
      suggestions: [],
    };
  }

  const suggestions = suggestFromRec(recMeals, dayResult.remaining, cfg);
  return {
    success: false,
    plan: dayResult.plan,
    consumed: dayResult.consumed,
    remaining: dayResult.remaining,
    suggestions,
  };
}

// ---------------------- MealPlanner Demo (includes suggestions card) ----------------------
const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function MealPlannerDemo({
  initialDayMeals = null,
  recMeals = [],
  targets,
}) {
  const useMenu = useMessMenu && !initialDayMeals;
  const {
    menu,
    isLoaded,
    toggleLike,
    toggleDislike,
    getLikedItems,
    resetMenu,
  } = useMenu
    ? useMessMenu()
    : {
        menu: {},
        isLoaded: true,
        toggleLike: () => {},
        toggleDislike: () => {},
        getLikedItems: () => [],
        resetMenu: () => {},
      };

  const today = new Date();
  const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dayKey = DAY_KEYS[today.getDay()] || "sun";

  const menuToUse = initialDayMeals ||
    (menu && menu[dayKey]) ||
    menu[Object.keys(menu)[0]] || {
      breakfast: [],
      lunch: [],
      snacks: [],
      dinner: [],
      suggestions: [],
    };

  if (!menuToUse.suggestions) menuToUse.suggestions = [];

  const [dayMeals, setDayMeals] = useState(menuToUse);

  // localToggleLike / localToggleDislike (unchanged) ...
  function localToggleLike(mealType, idx) {
    if (useMenu) {
      toggleLike(dayKey, mealType, idx);
      setDayMeals((prev) => {
        const copy = JSON.parse(JSON.stringify(prev));
        if ((copy[mealType] || [])[idx]) {
          copy[mealType][idx].liked = !copy[mealType][idx].liked;
          if (copy[mealType][idx].liked) copy[mealType][idx].disliked = false;
        }
        return copy;
      });
    } else {
      setDayMeals((prev) => {
        const copy = JSON.parse(JSON.stringify(prev));
        if ((copy[mealType] || [])[idx]) {
          copy[mealType][idx].liked = !copy[mealType][idx].liked;
          if (copy[mealType][idx].liked) copy[mealType][idx].disliked = false;
        }
        return copy;
      });
    }
  }

  function localToggleDislike(mealType, idx) {
    if (useMenu) {
      toggleDislike(dayKey, mealType, idx);
      setDayMeals((prev) => {
        const copy = JSON.parse(JSON.stringify(prev));
        if ((copy[mealType] || [])[idx]) {
          copy[mealType][idx].disliked = !copy[mealType][idx].disliked;
          if (copy[mealType][idx].disliked) copy[mealType][idx].liked = false;
        }
        return copy;
      });
    } else {
      setDayMeals((prev) => {
        const copy = JSON.parse(JSON.stringify(prev));
        if ((copy[mealType] || [])[idx]) {
          copy[mealType][idx].disliked = !copy[mealType][idx].disliked;
          if (copy[mealType][idx].disliked) copy[mealType][idx].liked = false;
        }
        return copy;
      });
    }
  }

  const mealSetWithHandlers = {};
  ["breakfast", "lunch", "snacks", "dinner", "suggestions"].forEach(
    (mealType) => {
      const arr = (dayMeals && dayMeals[mealType]) || [];
      mealSetWithHandlers[mealType] = arr.map((item, idx) => ({
        ...item,
        onLike: () => localToggleLike(mealType, idx),
        onDislike: () => localToggleDislike(mealType, idx),
      }));
    }
  );

  // compute plan using your existing planMealsFrontend
  const result = useMemo(
    () => planMealsFrontend({ dayMeals, recMeals, targets }),
    [dayMeals, recMeals, targets]
  );

  const likedItems = useMenu ? getLikedItems() : [];

  return (
    <div className="w-full mx-auto p-6 lg:flex justify-between gap-8">
      {/* LEFT: Today's Menu */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Today's Menu</h2>
            <span className="text-sm text-gray-500">
              ({dayKey.toUpperCase()})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <VariantButton
              onClick={() => {}}
              size="smsquare"
              variant="outline"
              icon="maximize-2"
            />
            <button
              onClick={() => {
                if (useMenu) {
                  resetMenu();
                } else {
                  setDayMeals((prev) => {
                    const copy = JSON.parse(JSON.stringify(prev));
                    for (const t of [
                      "breakfast",
                      "lunch",
                      "snacks",
                      "dinner",
                      "suggestions",
                    ]) {
                      (copy[t] || []).forEach((item) => {
                        item.liked = false;
                        item.disliked = false;
                      });
                    }
                    copy.suggestions = [];
                    return copy;
                  });
                }
              }}
              title="Reset stored preferences (for demo)"
              className="px-3 py-1 h-[38px] hover:cursor-pointer rounded bg-red-500 text-white text-sm hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white shadow-sm">
          <DashboardMealSetCard mealSet={mealSetWithHandlers} />
        </div>

        {likedItems && likedItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="text-sm font-semibold mb-2">
              Liked Items (this week)
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {likedItems.map((it, i) => (
                <li key={i}>
                  <span className="font-medium">{it.day.toUpperCase()}</span> •{" "}
                  {it.mealType} • {it.item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* RIGHT: Planner summary & suggestions */}
      <section className="space-y-4 mt-8 lg:mt-0 lg:w-1/3">
        <div>
          <h4 className="text-md font-semibold mb-2">Suggestions</h4>
          {result.success && (
            <div className="mt-2 inline-block text-green-700 bg-green-50 px-3 py-1 rounded text-sm">
              Daily targets satisfied ✅
            </div>
          )}

          {result.suggestions.length === 0 ? (
            <div className="text-sm text-gray-500"></div>
          ) : (
            <div className="space-y-3">
              {result.suggestions.map((s, i) => (
                <div key={i} className="bg-green/50 rounded-lg shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="">Option {i + 1} </div>
                      <div className="text-sm font-semibold text-gray-700 mt-1">
                        {s.meals.map((m) => (
                          <div className="my-2">
                            • {m.name} ({m.nutrition.calories} kcal)
                          </div>
                        ))}
                      </div>
                      <div className="text-[14px]  text-gray-500 mt-2">
                        Totals: {Math.round(s.total.calories)} kcal •{" "}
                        {Math.round(s.total.protein)}g P •{" "}
                        {Math.round(s.total.carbs)}g C •{" "}
                        {Math.round(s.total.fats)}g F
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setDayMeals((prev) => {
                            const copy = JSON.parse(JSON.stringify(prev));
                            if (!copy.suggestions) copy.suggestions = [];
                            for (const m of s.meals) {
                              copy.suggestions.push({
                                name: m.name,
                                tags: Array.from(
                                  new Set([...(m.tags || []), "suggested"])
                                ),
                                nutrition: m.nutrition,
                                liked: false,
                                disliked: false,
                              });
                            }
                            return copy;
                          });
                        }}
                        className="ml-4 px-3 py-1 h-fit flex flex-col items-center justify-center rounded border border-blue-700 hover:cursor-pointer hover:text-white text-sm hover:bg-blue-700"
                      >
                        <div className="mr-2">Add to</div>
                        <div className="flex justify-center items-center">
                          <div>suggestions</div>
                          <Icon name="arrow-right" size={16} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Nutrition tracker widget — pass real consumed and target values */}
      <div className="mt-8">
        <NutritionTrackerWidget consumed={result.consumed} target={targets} />
      </div>
    </div>
  );
}
