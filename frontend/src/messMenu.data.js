// messMenu.data.js
const MessMenuData = {
  sun: {
    breakfast: [
      {
        name: "Pancakes",
        tags: ["healthy_choice", "vegetarian", "sweet"],
        nutrition: { calories: 350, protein: 8, carbs: 45, fats: 10 },
        liked: false,
        disliked: false,
      },
      {
        name: "Scrambled Eggs",
        tags: ["protein_boost", "gluten_free"],
        nutrition: { calories: 250, protein: 12, carbs: 2, fats: 20 },
        liked: false,
        disliked: false,
      },
      {
        name: "Fruit Salad",
        tags: ["vegan", "low_fat"],
        nutrition: { calories: 150, protein: 2, carbs: 35, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
    lunch: [
      {
        name: "Grilled Chicken",
        tags: ["protein_boost", "gluten_free"],
        nutrition: { calories: 400, protein: 35, carbs: 0, fats: 15 },
        liked: false,
        disliked: false,
      },
      {
        name: "Quinoa Salad",
        tags: ["vegan", "gluten_free", "healthy_choice"],
        nutrition: { calories: 300, protein: 8, carbs: 40, fats: 10 },
        liked: false,
        disliked: false,
      },
      {
        name: "Vegetable Soup",
        tags: ["vegetarian", "low_calorie"],
        nutrition: { calories: 200, protein: 5, carbs: 30, fats: 5 },
        liked: false,
        disliked: false,
      },
    ],
    snacks: [
      {
        name: "Yogurt Parfait",
        tags: ["vegetarian", "protein_boost"],
        nutrition: { calories: 180, protein: 10, carbs: 25, fats: 2 },
        liked: false,
        disliked: false,
      },
      {
        name: "Granola Bar",
        tags: ["vegan", "on_the_go"],
        nutrition: { calories: 220, protein: 6, carbs: 30, fats: 8 },
        liked: false,
        disliked: false,
      },
    ],
    dinner: [
      {
        name: "Salmon Fillet",
        tags: ["protein_boost", "omega3", "gluten_free"],
        nutrition: { calories: 450, protein: 40, carbs: 0, fats: 25 },
        liked: false,
        disliked: false,
      },
      {
        name: "Stir-Fried Tofu",
        tags: ["vegan", "healthy_choice"],
        nutrition: { calories: 350, protein: 20, carbs: 30, fats: 15 },
        liked: false,
        disliked: false,
      },
    ],
  },

  /* ---------- Monday ---------- */
  mon: {
    breakfast: [
      {
        name: "Oatmeal",
        tags: ["healthy_choice", "high_fiber"],
        nutrition: { calories: 200, protein: 6, carbs: 35, fats: 4 },
        liked: false,
        disliked: false,
      },
      {
        name: "Boiled Eggs",
        tags: ["protein_boost", "gluten_free"],
        nutrition: { calories: 150, protein: 12, carbs: 1, fats: 10 },
        liked: false,
        disliked: false,
      },
      {
        name: "Banana",
        tags: ["vegan", "on_the_go"],
        nutrition: { calories: 100, protein: 1, carbs: 27, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
    lunch: [
      {
        name: "Beef Stir Fry",
        tags: ["protein_boost"],
        nutrition: { calories: 480, protein: 38, carbs: 30, fats: 18 },
        liked: false,
        disliked: false,
      },
      {
        name: "Noodles (veg)",
        tags: ["vegetarian", "carb_rich"],
        nutrition: { calories: 420, protein: 10, carbs: 60, fats: 10 },
        liked: false,
        disliked: false,
      },
      {
        name: "Spring Rolls",
        tags: ["snack", "vegetarian"],
        nutrition: { calories: 220, protein: 4, carbs: 28, fats: 10 },
        liked: false,
        disliked: false,
      },
    ],
    snacks: [
      {
        name: "Hummus with Veggies",
        tags: ["vegan", "healthy_choice"],
        nutrition: { calories: 180, protein: 6, carbs: 14, fats: 10 },
        liked: false,
        disliked: false,
      },
      {
        name: "Cheese Cubes",
        tags: ["protein_boost", "vegetarian"],
        nutrition: { calories: 160, protein: 9, carbs: 1, fats: 13 },
        liked: false,
        disliked: false,
      },
      {
        name: "Apple Slices",
        tags: ["vegan", "low_calorie"],
        nutrition: { calories: 80, protein: 0, carbs: 21, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
    dinner: [
      {
        name: "Chicken Curry",
        tags: ["protein_boost"],
        nutrition: { calories: 420, protein: 30, carbs: 20, fats: 20 },
        liked: false,
        disliked: false,
      },
      {
        name: "Naan Bread",
        tags: ["carb_rich"],
        nutrition: { calories: 260, protein: 6, carbs: 45, fats: 6 },
        liked: false,
        disliked: false,
      },
      {
        name: "Cucumber Raita",
        tags: ["vegetarian", "light"],
        nutrition: { calories: 80, protein: 3, carbs: 6, fats: 5 },
        liked: false,
        disliked: false,
      },
    ],
  },

  /* ---------- Tuesday ---------- */
  tue: {
    breakfast: [
      {
        name: "French Toast",
        tags: ["sweet", "carb_rich"],
        nutrition: { calories: 320, protein: 8, carbs: 40, fats: 12 },
        liked: false,
        disliked: false,
      },
      {
        name: "Yogurt",
        tags: ["vegetarian", "probiotic"],
        nutrition: { calories: 120, protein: 6, carbs: 12, fats: 4 },
        liked: false,
        disliked: false,
      },
      {
        name: "Berries Bowl",
        tags: ["vegan", "antioxidants"],
        nutrition: { calories: 90, protein: 1, carbs: 22, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
    lunch: [
      {
        name: "Fish Tacos",
        tags: ["protein_boost"],
        nutrition: { calories: 420, protein: 28, carbs: 35, fats: 15 },
        liked: false,
        disliked: false,
      },
      {
        name: "Mexican Rice",
        tags: ["carb_rich"],
        nutrition: { calories: 300, protein: 6, carbs: 55, fats: 5 },
        liked: false,
        disliked: false,
      },
      {
        name: "Corn Salad",
        tags: ["vegetarian", "healthy_choice"],
        nutrition: { calories: 220, protein: 5, carbs: 34, fats: 6 },
        liked: false,
        disliked: false,
      },
    ],
    snacks: [
      {
        name: "Trail Mix",
        tags: ["energy_boost", "on_the_go"],
        nutrition: { calories: 260, protein: 6, carbs: 30, fats: 12 },
        liked: false,
        disliked: false,
      },
      {
        name: "Protein Shake",
        tags: ["protein_boost", "low_carb"],
        nutrition: { calories: 180, protein: 25, carbs: 6, fats: 3 },
        liked: false,
        disliked: false,
      },
      {
        name: "Carrot Sticks",
        tags: ["vegan", "low_calorie"],
        nutrition: { calories: 50, protein: 1, carbs: 12, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
    dinner: [
      {
        name: "Vegetable Lasagna",
        tags: ["vegetarian"],
        nutrition: { calories: 420, protein: 14, carbs: 50, fats: 18 },
        liked: false,
        disliked: false,
      },
      {
        name: "Garlic Bread",
        tags: ["carb_rich"],
        nutrition: { calories: 180, protein: 4, carbs: 24, fats: 6 },
        liked: false,
        disliked: false,
      },
      {
        name: "Mixed Green Salad",
        tags: ["vegan", "light"],
        nutrition: { calories: 120, protein: 3, carbs: 12, fats: 6 },
        liked: false,
        disliked: false,
      },
    ],
  },

  /* ---------- Wednesday ---------- */
  wed: {
    breakfast: [
      {
        name: "Bagel with Cream Cheese",
        tags: ["carb_rich", "vegetarian"],
        nutrition: { calories: 350, protein: 9, carbs: 50, fats: 12 },
        liked: false,
        disliked: false,
      },
      {
        name: "Orange Juice",
        tags: ["vegan", "vitamins"],
        nutrition: { calories: 110, protein: 1, carbs: 25, fats: 0 },
        liked: false,
        disliked: false,
      },
      {
        name: "Avocado Toast",
        tags: ["healthy_choice", "vegetarian"],
        nutrition: { calories: 270, protein: 6, carbs: 28, fats: 14 },
        liked: false,
        disliked: false,
      },
    ],
    lunch: [
      {
        name: "Turkey Sandwich",
        tags: ["protein_boost"],
        nutrition: { calories: 360, protein: 28, carbs: 38, fats: 10 },
        liked: false,
        disliked: false,
      },
      {
        name: "Chips",
        tags: ["snack", "carb_rich"],
        nutrition: { calories: 200, protein: 2, carbs: 22, fats: 12 },
        liked: false,
        disliked: false,
      },
      {
        name: "Coleslaw",
        tags: ["vegetarian", "side"],
        nutrition: { calories: 150, protein: 1, carbs: 12, fats: 10 },
        liked: false,
        disliked: false,
      },
    ],
    snacks: [
      {
        name: "Popcorn",
        tags: ["light_snack", "vegan"],
        nutrition: { calories: 120, protein: 3, carbs: 18, fats: 4 },
        liked: false,
        disliked: false,
      },
      {
        name: "Fruit Cup",
        tags: ["vegan", "low_calorie"],
        nutrition: { calories: 90, protein: 1, carbs: 22, fats: 0 },
        liked: false,
        disliked: false,
      },
      {
        name: "Rice Cakes",
        tags: ["low_fat", "light_snack"],
        nutrition: { calories: 70, protein: 1, carbs: 15, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
    dinner: [
      {
        name: "Beef Stew",
        tags: ["protein_boost"],
        nutrition: { calories: 500, protein: 36, carbs: 28, fats: 22 },
        liked: false,
        disliked: false,
      },
      {
        name: "Mashed Potatoes",
        tags: ["carb_rich"],
        nutrition: { calories: 220, protein: 4, carbs: 30, fats: 8 },
        liked: false,
        disliked: false,
      },
      {
        name: "Green Beans",
        tags: ["vegetarian", "low_calorie"],
        nutrition: { calories: 60, protein: 2, carbs: 10, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
  },

  /* ---------- Thursday ---------- */
  thu: {
    breakfast: [
      {
        name: "Waffles",
        tags: ["sweet", "carb_rich"],
        nutrition: { calories: 340, protein: 7, carbs: 45, fats: 12 },
        liked: false,
        disliked: false,
      },
      {
        name: "Sausage Links",
        tags: ["protein_boost"],
        nutrition: { calories: 220, protein: 10, carbs: 2, fats: 18 },
        liked: false,
        disliked: false,
      },
      {
        name: "Fruit Smoothie",
        tags: ["vegan", "vitamins"],
        nutrition: { calories: 180, protein: 3, carbs: 34, fats: 2 },
        liked: false,
        disliked: false,
      },
    ],
    lunch: [
      {
        name: "Chicken Caesar Wrap",
        tags: ["protein_boost"],
        nutrition: { calories: 420, protein: 30, carbs: 34, fats: 14 },
        liked: false,
        disliked: false,
      },
      {
        name: "Pasta Salad",
        tags: ["vegetarian", "cold"],
        nutrition: { calories: 320, protein: 8, carbs: 45, fats: 10 },
        liked: false,
        disliked: false,
      },
      {
        name: "Fruit Cup",
        tags: ["vegan", "low_calorie"],
        nutrition: { calories: 90, protein: 1, carbs: 22, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
    snacks: [
      {
        name: "Yogurt Parfait",
        tags: ["vegetarian", "protein_boost"],
        nutrition: { calories: 200, protein: 12, carbs: 22, fats: 4 },
        liked: false,
        disliked: false,
      },
      {
        name: "Almonds",
        tags: ["healthy_fats", "snack"],
        nutrition: { calories: 160, protein: 6, carbs: 6, fats: 14 },
        liked: false,
        disliked: false,
      },
      {
        name: "Grapes",
        tags: ["vegan", "light_snack"],
        nutrition: { calories: 70, protein: 1, carbs: 18, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
    dinner: [
      {
        name: "Shrimp Scampi",
        tags: ["protein_boost", "gluten_free_option"],
        nutrition: { calories: 420, protein: 30, carbs: 20, fats: 18 },
        liked: false,
        disliked: false,
      },
      {
        name: "Garlic Bread",
        tags: ["carb_rich"],
        nutrition: { calories: 180, protein: 4, carbs: 24, fats: 6 },
        liked: false,
        disliked: false,
      },
      {
        name: "Caesar Salad",
        tags: ["vegetarian", "side"],
        nutrition: { calories: 200, protein: 6, carbs: 8, fats: 14 },
        liked: false,
        disliked: false,
      },
    ],
  },

  /* ---------- Friday ---------- */
  fri: {
    breakfast: [
      {
        name: "Eggs Benedict",
        tags: ["protein_boost"],
        nutrition: { calories: 420, protein: 20, carbs: 30, fats: 22 },
        liked: false,
        disliked: false,
      },
      {
        name: "Hash Browns",
        tags: ["carb_rich"],
        nutrition: { calories: 260, protein: 3, carbs: 30, fats: 14 },
        liked: false,
        disliked: false,
      },
      {
        name: "Grapefruit",
        tags: ["vegan", "vitamins"],
        nutrition: { calories: 90, protein: 1, carbs: 23, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],
    lunch: [
      {
        name: "BBQ Pulled Pork",
        tags: ["protein_boost"],
        nutrition: { calories: 540, protein: 40, carbs: 30, fats: 26 },
        liked: false,
        disliked: false,
      },
      {
        name: "Baked Beans",
        tags: ["vegetarian", "fiber"],
        nutrition: { calories: 220, protein: 12, carbs: 35, fats: 2 },
        liked: false,
        disliked: false,
      },
      {
        name: "Cornbread",
        tags: ["carb_rich"],
        nutrition: { calories: 280, protein: 5, carbs: 40, fats: 10 },
        liked: false,
        disliked: false,
      },
    ],
    snacks: [
      {
        name: "Cheese and Crackers",
        tags: ["protein_boost", "snack"],
        nutrition: { calories: 250, protein: 10, carbs: 18, fats: 14 },
        liked: false,
        disliked: false,
      },
      {
        name: "Veggie Sticks",
        tags: ["vegan", "low_calorie"],
        nutrition: { calories: 60, protein: 2, carbs: 12, fats: 0 },
        liked: false,
        disliked: false,
      },
      {
        name: "Hummus",
        tags: ["vegan", "healthy_choice"],
        nutrition: { calories: 150, protein: 5, carbs: 12, fats: 9 },
        liked: false,
        disliked: false,
      },
    ],
    dinner: [
      {
        name: "Pizza (Veg)",
        tags: ["vegetarian", "cheat_meal"],
        nutrition: { calories: 650, protein: 22, carbs: 72, fats: 28 },
        liked: false,
        disliked: false,
      },
      {
        name: "Caesar Salad",
        tags: ["vegetarian", "side"],
        nutrition: { calories: 200, protein: 6, carbs: 8, fats: 14 },
        liked: false,
        disliked: false,
      },
      {
        name: "Garlic Knots",
        tags: ["carb_rich"],
        nutrition: { calories: 150, protein: 3, carbs: 20, fats: 6 },
        liked: false,
        disliked: false,
      },
    ],
  },

  /* ---------- Saturday ---------- */
  sat: {
    breakfast: [
      {
        name: "Breakfast Burrito",
        tags: ["protein_boost", "carb_rich"],
        nutrition: { calories: 450, protein: 20, carbs: 48, fats: 18 },
        liked: false,
        disliked: false,
      },
      {
        name: "Salsa & Avocado",
        tags: ["vegan", "healthy_fats"],
        nutrition: { calories: 140, protein: 2, carbs: 8, fats: 12 },
        liked: false,
        disliked: false,
      },
      {
        name: "Smoothie Bowl",
        tags: ["vegan", "vitamin_rich"],
        nutrition: { calories: 300, protein: 6, carbs: 50, fats: 6 },
        liked: false,
        disliked: false,
      },
    ],

    lunch: [
      {
        name: "Grilled Cheese",
        tags: ["vegetarian", "comfort_food"],
        nutrition: { calories: 420, protein: 14, carbs: 36, fats: 22 },
        liked: false,
        disliked: false,
      },
      {
        name: "Tomato Soup",
        tags: ["vegetarian", "light"],
        nutrition: { calories: 150, protein: 4, carbs: 20, fats: 6 },
        liked: false,
        disliked: false,
      },
      {
        name: "Pickles",
        tags: ["vegan", "low_calorie"],
        nutrition: { calories: 10, protein: 0, carbs: 2, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],

    snacks: [
      {
        name: "Mixed Nuts",
        tags: ["healthy_fats", "on_the_go"],
        nutrition: { calories: 200, protein: 6, carbs: 8, fats: 18 },
        liked: false,
        disliked: false,
      },
      {
        name: "Fruit Salad",
        tags: ["vegan", "low_fat"],
        nutrition: { calories: 120, protein: 2, carbs: 30, fats: 0 },
        liked: false,
        disliked: false,
      },
    ],

    dinner: [
      {
        name: "Roast Chicken",
        tags: ["protein_boost"],
        nutrition: { calories: 480, protein: 42, carbs: 0, fats: 24 },
        liked: false,
        disliked: false,
      },
      {
        name: "Roasted Vegetables",
        tags: ["vegan", "healthy_choice"],
        nutrition: { calories: 220, protein: 6, carbs: 30, fats: 8 },
        liked: false,
        disliked: false,
      },
      {
        name: "Dinner Rolls",
        tags: ["carb_rich"],
        nutrition: { calories: 160, protein: 4, carbs: 28, fats: 3 },
        liked: false,
        disliked: false,
      },
    ],
  },
};

export { MessMenuData };
