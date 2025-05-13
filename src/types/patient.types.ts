export interface Patient {
  id: string;
  name: string;
  room: string;
  dietaryRestrictions: string[];
  allergies: string[];
  nutritionalRequirements: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
