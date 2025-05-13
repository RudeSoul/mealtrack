export interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  dietaryTags: string[];
  image?: string;
}

export interface MealPlan {
  id: string;
  patientId: string;
  date: string;
  meals: {
    breakfast?: Meal;
    lunch?: Meal;
    dinner?: Meal;
    snacks: Meal[];
  };
  nutritionTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
