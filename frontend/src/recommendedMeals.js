const recMeals = [
  // --- Protein-rich mains ---
  {
    name: "Grilled Chicken Breast (150g)",
    tags: ["protein_boost", "gluten_free"],
    nutrition: { calories: 260, protein: 32, carbs: 0, fats: 6 },
  },
  {
    name: "Paneer Tikka (150g)",
    tags: ["vegetarian", "protein_boost"],
    nutrition: { calories: 300, protein: 25, carbs: 8, fats: 18 },
  },
  {
    name: "Boiled Eggs (2)",
    tags: ["protein_boost", "low_carb"],
    nutrition: { calories: 160, protein: 12, carbs: 1, fats: 12 },
  },
  {
    name: "Tofu Stir-Fry (150g)",
    tags: ["vegan", "healthy_choice"],
    nutrition: { calories: 280, protein: 22, carbs: 12, fats: 14 },
  },
  {
    name: "Lentil Curry (1 bowl)",
    tags: ["vegan", "fiber_rich"],
    nutrition: { calories: 320, protein: 18, carbs: 40, fats: 6 },
  },
  {
    name: "Fish Curry (150g)",
    tags: ["omega3", "protein_boost"],
    nutrition: { calories: 350, protein: 30, carbs: 4, fats: 18 },
  },

  // --- Balanced carb sources ---
  {
    name: "Brown Rice (1 cup)",
    tags: ["vegan", "complex_carbs"],
    nutrition: { calories: 210, protein: 5, carbs: 44, fats: 2 },
  },
  {
    name: "Quinoa Bowl (1 cup)",
    tags: ["vegan", "gluten_free", "fiber_rich"],
    nutrition: { calories: 220, protein: 8, carbs: 40, fats: 4 },
  },
  {
    name: "Sweet Potato (150g)",
    tags: ["healthy_choice", "complex_carbs"],
    nutrition: { calories: 130, protein: 2, carbs: 30, fats: 0 },
  },
  {
    name: "Whole Wheat Chapati (2)",
    tags: ["vegetarian", "fiber_rich"],
    nutrition: { calories: 160, protein: 6, carbs: 30, fats: 3 },
  },
  {
    name: "Oats with Milk (1 bowl)",
    tags: ["vegetarian", "fiber_rich"],
    nutrition: { calories: 280, protein: 10, carbs: 45, fats: 7 },
  },

  // --- Quick snacks ---
  {
    name: "Banana (2 medium)",
    tags: ["vegan", "on_the_go"],
    nutrition: { calories: 200, protein: 2, carbs: 50, fats: 0 },
  },
  {
    name: "Apple with Peanut Butter",
    tags: ["vegetarian", "healthy_fats"],
    nutrition: { calories: 250, protein: 6, carbs: 30, fats: 12 },
  },
  {
    name: "Greek Yogurt (200g)",
    tags: ["vegetarian", "protein_boost"],
    nutrition: { calories: 140, protein: 15, carbs: 8, fats: 3 },
  },
  {
    name: "Protein Shake (1 scoop)",
    tags: ["protein_boost", "on_the_go"],
    nutrition: { calories: 180, protein: 25, carbs: 4, fats: 3 },
  },
  {
    name: "Trail Mix (30g)",
    tags: ["vegan", "healthy_fats"],
    nutrition: { calories: 180, protein: 6, carbs: 14, fats: 10 },
  },
  {
    name: "Boiled Chickpeas (1 cup)",
    tags: ["vegan", "fiber_rich"],
    nutrition: { calories: 210, protein: 15, carbs: 35, fats: 2 },
  },

  // --- Recovery / dinner options ---
  {
    name: "Grilled Salmon (150g)",
    tags: ["omega3", "protein_boost"],
    nutrition: { calories: 400, protein: 35, carbs: 0, fats: 25 },
  },
  {
    name: "Vegetable Khichdi (1 bowl)",
    tags: ["vegetarian", "comfort_food"],
    nutrition: { calories: 280, protein: 10, carbs: 45, fats: 6 },
  },
  {
    name: "Egg Curry (2 eggs)",
    tags: ["protein_boost"],
    nutrition: { calories: 270, protein: 18, carbs: 4, fats: 18 },
  },
  {
    name: "Rajma (Kidney Beans Curry)",
    tags: ["vegan", "fiber_rich"],
    nutrition: { calories: 320, protein: 14, carbs: 45, fats: 6 },
  },
  {
    name: "Hummus with Pita (1 serving)",
    tags: ["vegan", "healthy_fats"],
    nutrition: { calories: 300, protein: 10, carbs: 36, fats: 12 },
  },
  {
    name: "Mixed Fruit Smoothie (250ml)",
    tags: ["vegan", "on_the_go"],
    nutrition: { calories: 220, protein: 6, carbs: 42, fats: 4 },
  },
];

export { recMeals };