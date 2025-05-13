import { Patient } from "../types/patient.types";
import { Meal, MealPlan } from "../types/meal.types";
import { InventoryItem } from "../types/inventory.types";

export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Smith",
    room: "101A",
    dietaryRestrictions: ["Gluten-Free", "Low Sodium"],
    allergies: ["Peanuts", "Shellfish"],
    nutritionalRequirements: {
      calories: 2000,
      protein: 75,
      carbs: 250,
      fat: 65,
    },
  },
  {
    id: "2",
    name: "Mary Johnson",
    room: "102B",
    dietaryRestrictions: ["Diabetic", "Vegetarian"],
    allergies: ["Dairy"],
    nutritionalRequirements: {
      calories: 1800,
      protein: 65,
      carbs: 200,
      fat: 60,
    },
  },
  {
    id: "3",
    name: "Robert Davis",
    room: "103C",
    dietaryRestrictions: ["Pureed", "Low Cholesterol"],
    allergies: ["Eggs", "Tree Nuts"],
    nutritionalRequirements: {
      calories: 1600,
      protein: 70,
      carbs: 180,
      fat: 50,
    },
  },
  {
    id: "4",
    name: "Patricia Wilson",
    room: "104D",
    dietaryRestrictions: ["Kosher", "Low Carb"],
    allergies: [],
    nutritionalRequirements: {
      calories: 1900,
      protein: 80,
      carbs: 150,
      fat: 70,
    },
  },
  {
    id: "5",
    name: "James Brown",
    room: "105E",
    dietaryRestrictions: ["Renal Diet"],
    allergies: ["Soy"],
    nutritionalRequirements: {
      calories: 2200,
      protein: 60,
      carbs: 280,
      fat: 75,
    },
  },
];

// Mock data for Meals
export const mockMeals: Meal[] = [
  {
    id: "1",
    name: "Scrambled Eggs with Toast",
    type: "breakfast",
    calories: 350,
    protein: 15,
    carbs: 30,
    fat: 20,
    ingredients: ["Eggs", "Milk", "Butter", "Whole Wheat Bread"],
    dietaryTags: ["High Protein"],
  },
  {
    id: "2",
    name: "Oatmeal with Berries",
    type: "breakfast",
    calories: 280,
    protein: 8,
    carbs: 45,
    fat: 6,
    ingredients: ["Oats", "Milk", "Mixed Berries", "Honey"],
    dietaryTags: ["Heart Healthy", "High Fiber"],
  },
  {
    id: "3",
    name: "Grilled Chicken Salad",
    type: "lunch",
    calories: 400,
    protein: 35,
    carbs: 20,
    fat: 15,
    ingredients: [
      "Chicken Breast",
      "Mixed Greens",
      "Tomatoes",
      "Cucumber",
      "Olive Oil",
    ],
    dietaryTags: ["High Protein", "Low Carb"],
  },
  {
    id: "4",
    name: "Vegetable Soup with Roll",
    type: "lunch",
    calories: 320,
    protein: 10,
    carbs: 45,
    fat: 8,
    ingredients: [
      "Vegetable Broth",
      "Carrots",
      "Celery",
      "Onions",
      "Whole Grain Roll",
    ],
    dietaryTags: ["Vegetarian", "Low Fat"],
  },
  {
    id: "5",
    name: "Baked Salmon with Roasted Vegetables",
    type: "dinner",
    calories: 450,
    protein: 30,
    carbs: 25,
    fat: 25,
    ingredients: ["Salmon Fillet", "Broccoli", "Carrots", "Olive Oil", "Herbs"],
    dietaryTags: ["Heart Healthy", "High Protein"],
  },
  {
    id: "6",
    name: "Pasta Primavera",
    type: "dinner",
    calories: 380,
    protein: 12,
    carbs: 60,
    fat: 10,
    ingredients: [
      "Whole Wheat Pasta",
      "Mixed Vegetables",
      "Olive Oil",
      "Parmesan",
    ],
    dietaryTags: ["Vegetarian"],
  },
  {
    id: "7",
    name: "Greek Yogurt with Granola",
    type: "snack",
    calories: 200,
    protein: 15,
    carbs: 25,
    fat: 5,
    ingredients: ["Greek Yogurt", "Granola", "Honey"],
    dietaryTags: ["High Protein"],
  },
  {
    id: "8",
    name: "Fresh Fruit Cup",
    type: "snack",
    calories: 120,
    protein: 1,
    carbs: 30,
    fat: 0,
    ingredients: ["Apple", "Orange", "Grapes", "Melon"],
    dietaryTags: ["Vegan", "Low Fat"],
  },
];

const generateWeekDates = () => {
  const dates = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

const weekDates = generateWeekDates();

// Mock data for Meal Plans
export const mockMealPlans: MealPlan[] = [
  {
    id: "mp1",
    patientId: "1",
    date: weekDates[0],
    meals: {
      breakfast: mockMeals[0],
      lunch: mockMeals[2],
      dinner: mockMeals[4],
      snacks: [mockMeals[6]],
    },
    nutritionTotals: {
      calories: 1400,
      protein: 95,
      carbs: 100,
      fat: 65,
    },
  },
  {
    id: "mp2",
    patientId: "1",
    date: weekDates[1],
    meals: {
      breakfast: mockMeals[1],
      lunch: mockMeals[3],
      dinner: mockMeals[5],
      snacks: [mockMeals[7]],
    },
    nutritionTotals: {
      calories: 1100,
      protein: 31,
      carbs: 180,
      fat: 24,
    },
  },

  {
    id: "mp3",
    patientId: "2",
    date: weekDates[0],
    meals: {
      breakfast: mockMeals[1],
      lunch: mockMeals[3],
      dinner: mockMeals[5],
      snacks: [mockMeals[7]],
    },
    nutritionTotals: {
      calories: 1100,
      protein: 31,
      carbs: 180,
      fat: 24,
    },
  },
];

// Mock data for Inventory Items
export const mockInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Chicken Breast",
    category: "Protein",
    quantity: 25,
    unit: "lbs",
    expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: "Freezer 1",
    minimumStock: 20,
    cost: 3.99,
  },
  {
    id: "2",
    name: "Whole Wheat Bread",
    category: "Grains",
    quantity: 15,
    unit: "loaves",
    expirationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: "Pantry A",
    minimumStock: 10,
    cost: 2.49,
  },
  {
    id: "3",
    name: "Mixed Vegetables",
    category: "Produce",
    quantity: 8,
    unit: "lbs",
    expirationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: "Refrigerator 2",
    minimumStock: 15,
    cost: 1.99,
  },
  {
    id: "4",
    name: "Milk",
    category: "Dairy",
    quantity: 12,
    unit: "gallons",
    expirationDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: "Refrigerator 1",
    minimumStock: 8,
    cost: 3.29,
  },
  {
    id: "5",
    name: "Salmon Fillets",
    category: "Protein",
    quantity: 10,
    unit: "lbs",
    expirationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: "Freezer 2",
    minimumStock: 12,
    cost: 8.99,
  },
  {
    id: "6",
    name: "Oats",
    category: "Grains",
    quantity: 30,
    unit: "lbs",
    expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: "Pantry B",
    minimumStock: 25,
    cost: 1.79,
  },
  {
    id: "7",
    name: "Fresh Fruit",
    category: "Produce",
    quantity: 5,
    unit: "lbs",
    expirationDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: "Refrigerator 2",
    minimumStock: 10,
    cost: 2.99,
  },
];

// Mock data for Nutrition Compliance
export const mockNutritionData = [
  {
    period: "Week 1",
    calorieTarget: 10000,
    calorieActual: 9500,
    proteinTarget: 350,
    proteinActual: 320,
    carbsTarget: 1200,
    carbsActual: 1150,
    fatTarget: 300,
    fatActual: 290,
  },
  {
    period: "Week 2",
    calorieTarget: 10000,
    calorieActual: 9800,
    proteinTarget: 350,
    proteinActual: 340,
    carbsTarget: 1200,
    carbsActual: 1180,
    fatTarget: 300,
    fatActual: 295,
  },
  {
    period: "Week 3",
    calorieTarget: 10000,
    calorieActual: 9900,
    proteinTarget: 350,
    proteinActual: 345,
    carbsTarget: 1200,
    carbsActual: 1190,
    fatTarget: 300,
    fatActual: 298,
  },
  {
    period: "Week 4",
    calorieTarget: 10000,
    calorieActual: 10100,
    proteinTarget: 350,
    proteinActual: 355,
    carbsTarget: 1200,
    carbsActual: 1210,
    fatTarget: 300,
    fatActual: 305,
  },
];

// Mock data for Dashboard Stats
export const mockDashboardStats = {
  totalPatients: 5,
  mealsServedToday: 42,
  dietaryCompliance: 94,
  inventoryAlerts: 3,
  patientSatisfaction: 4.2,
};
