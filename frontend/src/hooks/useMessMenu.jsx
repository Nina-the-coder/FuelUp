// src/hooks/useMessMenu.js
import { useEffect, useState, useCallback } from "react";
import { MessMenuData } from "../messMenu.data";

/**
 * useMessMenu hook
 * - storageKey: optional localStorage key (default: "menuData")
 * - initialData: optional override for MessMenuData
 */
export default function useMessMenu(
  storageKey = "menuData",
  initialData = MessMenuData
) {
  const [menu, setMenu] = useState(null);

  // Helper: deep clone
  const clone = (v) => JSON.parse(JSON.stringify(v));

  // Initialize menu from localStorage, else from MessMenuData
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setMenu(JSON.parse(stored));
      } else {
        // Use deep clone so we don't mutate original MessMenuData
        setMenu(clone(initialData));
        localStorage.setItem(storageKey, JSON.stringify(clone(initialData)));
      }
    } catch (e) {
      console.error("Failed to load menu from localStorage:", e);
      setMenu(clone(initialData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Persist whenever menu changes
  useEffect(() => {
    if (menu !== null) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(menu));
      } catch (e) {
        console.error("Failed to save menu to localStorage:", e);
      }
    }
  }, [menu, storageKey]);

  // Overwrite / add a whole menu object (and persist)
  const addMenu = useCallback(
    (newMenu) => {
      setMenu(clone(newMenu));
    },
    [setMenu]
  );

  // Reset menu to initial MessMenuData
  const resetMenu = useCallback(() => {
    const fresh = clone(initialData);
    setMenu(fresh);
    try {
      localStorage.setItem(storageKey, JSON.stringify(fresh));
    } catch (e) {
      console.error("Failed to reset menu in localStorage:", e);
    }
  }, [initialData, storageKey]);

  const _updateItemAtPath = useCallback(
    (dayKey, mealType, index, updater) => {
      if (!menu) return;
      if (
        !menu[dayKey] ||
        !menu[dayKey][mealType] ||
        menu[dayKey][mealType].length <= index
      ) {
        console.warn("Invalid path", dayKey, mealType, index);
        return;
      }
      const newMenu = clone(menu);
      const item = newMenu[dayKey][mealType][index];
      newMenu[dayKey][mealType][index] = updater(item);
      setMenu(newMenu);
    },
    [menu]
  );

  // Toggle LIKE
  const toggleLike = useCallback(
    (dayKey, mealType, index) => {
      _updateItemAtPath(dayKey, mealType, index, (item) => {
        // If already liked -> turn both off
        if (item.liked) {
          return { ...item, liked: false, disliked: false };
        }
        // Otherwise: like it and clear dislike
        return { ...item, liked: true, disliked: false };
      });
    },
    [_updateItemAtPath]
  );

  // Toggle DISLIKE
  const toggleDislike = useCallback(
    (dayKey, mealType, index) => {
      _updateItemAtPath(dayKey, mealType, index, (item) => {
        // If already disliked -> turn both off
        if (item.disliked) {
          return { ...item, disliked: false, liked: false };
        }
        // Otherwise: dislike it and clear like
        return { ...item, disliked: true, liked: false };
      });
    },
    [_updateItemAtPath]
  );

  // Get flat list of liked items { day, mealType, index, item }
  const getLikedItems = useCallback(() => {
    if (!menu) return [];
    const res = [];
    Object.keys(menu).forEach((dayKey) => {
      const dayObj = menu[dayKey];
      Object.keys(dayObj).forEach((mealType) => {
        dayObj[mealType].forEach((item, idx) => {
          if (item.liked) res.push({ day: dayKey, mealType, index: idx, item });
        });
      });
    });
    return res;
  }, [menu]);

  // Expose API
  return {
    menu, // full nested menu object (or null while loading)
    setMenu, // raw setter (use carefully)
    addMenu, // replace menu
    resetMenu, // reset to initial data
    toggleLike, // toggle like for a specific item
    toggleDislike, // toggle dislike for a specific item
    getLikedItems, // returns flat array of liked items
    isLoaded: menu !== null,
  };
}
