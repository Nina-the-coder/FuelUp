// MealRecommendation.jsx
import React, { useMemo, useState, useCallback, useEffect } from "react";
import VariantButton from "../components/VariantButton";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import MealRecommendationCard from "../components/cards/MealRecommendationCard";
import { recMeals } from "../recommendedMeals";
import useMessMenu from "../hooks/useMessMenu";

/**
 * Improvements:
 * - Controlled SearchBar + debounced query (200ms)
 * - Robust filter -> matches common tag variants (vegetarian, veg, vegan, gluten-free, gf, keto)
 * - Sort control and optional maxCalories input
 * - Clean API wiring for add/view on cards
 */

const FILTERS = [
  { label: "All", tags: null },
  { label: "Vegetarian", tags: ["vegetarian", "veg"] },
  { label: "Vegan", tags: ["vegan"] },
  { label: "Gluten-Free", tags: ["gluten_free", "gluten-free", "gf"] },
  { label: "Keto", tags: ["keto", "ketogenic"] },
];

export default function MealRecommendation() {
  const navigate = useNavigate();
  const useMenuHook = useMessMenu ? useMessMenu() : null;
  // destructure any helpful methods if available
  const { addSuggestion, insertMenuItem, appendToDay, ...restHook } = useMenuHook || {};

  // UI state
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filter, setFilter] = useState(FILTERS[0].label);
  const [maxCalories, setMaxCalories] = useState(""); // optional numeric filter
  const [sortBy, setSortBy] = useState("relevance"); // or calories_asc, calories_desc
  const [addedKeys, setAddedKeys] = useState(new Set());
  const [localSuggestions, setLocalSuggestions] = useState([]);

  // debounce query (200ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 200);
    return () => clearTimeout(t);
  }, [query]);

  // helper slugify
  const slugify = (s = "") =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const tryPersistSuggestion = useCallback(
    async (meal) => {
      try {
        if (typeof addSuggestion === "function") {
          await addSuggestion(meal);
          return true;
        }
        if (typeof insertMenuItem === "function") {
          await insertMenuItem({
            dayKey: "sun",
            mealType: "suggestions",
            item: { ...meal, tags: Array.from(new Set([...(meal.tags || []), "suggested"])) },
          });
          return true;
        }
        if (typeof appendToDay === "function") {
          await appendToDay("suggestions", { ...meal, tags: Array.from(new Set([...(meal.tags || []), "suggested"])) });
          return true;
        }
      } catch (e) {
        console.warn("persist suggestion failed:", e);
      }
      return false;
    },
    [addSuggestion, insertMenuItem, appendToDay]
  );

  const handleAdd = async (meal) => {
    const key = `${meal.name}-${Math.round(meal.nutrition?.calories || 0)}`;
    // try persist to central store
    const persisted = await tryPersistSuggestion(meal);
    if (persisted) {
      setAddedKeys((s) => new Set(s).add(key));
      return;
    }
    // fallback local
    setLocalSuggestions((prev) => {
      if (prev.some((m) => m.name === meal.name)) return prev;
      return [...prev, { ...meal, tags: Array.from(new Set([...(meal.tags || []), "suggested"])) }];
    });
    setAddedKeys((s) => new Set(s).add(key));
  };

  const handleView = (meal) => {
    const slug = slugify(meal.name || "meal");
    navigate(`/meals/${slug}`);
  };

  // normalise tags for matching
  const mealHasTag = (meal, wantedTags) => {
    if (!wantedTags || wantedTags.length === 0) return true;
    const itemTags = (meal.tags || []).map((t) => String(t).toLowerCase());
    return wantedTags.some((want) => itemTags.includes(want.toLowerCase()));
  };

  // prepare candidate list (recMeals is the source)
  const candidates = recMeals || [];

  // filtered & sorted results
  const filtered = useMemo(() => {
    const q = debouncedQuery || "";
    const filterObj = FILTERS.find((f) => f.label === filter) || FILTERS[0];
    const wantedTags = filterObj.tags;

    let list = candidates.filter((m) => {
      if (!m) return false;
      // max calories filter
      if (maxCalories) {
        const maxC = Number(maxCalories || 0);
        if (!Number.isNaN(maxC) && (m.nutrition?.calories ?? 0) > maxC) return false;
      }
      // tag filter
      if (wantedTags && wantedTags.length > 0 && !mealHasTag(m, wantedTags)) return false;
      // query match by name or tags
      if (q) {
        const name = (m.name || "").toLowerCase();
        const tags = (m.tags || []).join(" ").toLowerCase();
        if (!(name.includes(q) || tags.includes(q))) return false;
      }
      return true;
    });

    // sort
    if (sortBy === "calories_asc") {
      list.sort((a, b) => (a.nutrition?.calories || 0) - (b.nutrition?.calories || 0));
    } else if (sortBy === "calories_desc") {
      list.sort((a, b) => (b.nutrition?.calories || 0) - (a.nutrition?.calories || 0));
    } else {
      // relevance: put liked items first then by calories descending (heuristic)
      list.sort((a, b) => {
        const aLiked = !!a.liked;
        const bLiked = !!b.liked;
        if (aLiked !== bLiked) return aLiked ? -1 : 1;
        return (b.nutrition?.calories || 0) - (a.nutrition?.calories || 0);
      });
    }

    return list;
  }, [candidates, debouncedQuery, filter, maxCalories, sortBy]);

  // small UI helpers
  const dropdownOptions = FILTERS.map((f) => f.label);
  const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Calories ↑", value: "calories_asc" },
    { label: "Calories ↓", value: "calories_desc" },
  ];

  return (
    <div className="flex flex-col p-4">
      {/* header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <VariantButton onClick={() => navigate(-1)} size="smsquare" variant="outline" icon="arrow-left" aria-label="Back" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:ml-8">
          <div className="w-full sm:w-80">
            <SearchBar value={query} onChange={(v) => setQuery(v)} placeholder="Search meals or tags..." />
          </div>

          <div className="w-40">
            <Dropdown options={dropdownOptions} value={filter} onChange={(v) => setFilter(v)} />
          </div>

          <div className="w-36 hidden sm:block">
            <Dropdown options={sortOptions.map(s => s.label)} value={sortOptions.find(s => s.value === sortBy)?.label || "Relevance"} onChange={(label) => {
              const found = sortOptions.find(s => s.label === label);
              setSortBy(found ? found.value : "relevance");
            }} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              placeholder="Max kcal"
              value={maxCalories}
              onChange={(e) => setMaxCalories(e.target.value)}
              className="h-[40px] w-28 px-3 rounded-xl border border-gray-200"
              aria-label="Max calories filter"
            />
            <VariantButton onClick={() => { setQuery(""); setDebouncedQuery(""); setFilter("All"); setMaxCalories(""); setSortBy("relevance"); }} size="smsquare" variant="ghost" icon="refresh-cw" />
          </div>
        </div>
      </div>

      {/* results */}
      <div className="p-2 pt-6 md:p-6 lg:p-8 flex flex-wrap gap-6">
        {filtered.length === 0 ? (
          <div className="text-sm text-gray-500 p-4">No meals found for this search / filter.</div>
        ) : (
          filtered.map((meal, idx) => {
            const key = `${meal.name}-${Math.round((meal.nutrition?.calories || 0))}`;
            const isAdded = addedKeys.has(key);
            return (
              <MealRecommendationCard
                key={`rec-meal-${idx}-${meal.name}`}
                meal={meal}
                compact={false}
                onAdd={(m) => handleAdd(m)}
                onView={(m) => handleView(m)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
