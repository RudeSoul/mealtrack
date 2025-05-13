import React, { createContext, useState, useContext, ReactNode } from "react";
import { Patient } from "../types/patient.types";
import { Meal, MealPlan } from "../types/meal.types";
import { InventoryItem } from "../types/inventory.types";
import {
  mockPatients,
  mockMeals,
  mockMealPlans,
  mockInventoryItems,
  mockNutritionData,
  mockDashboardStats,
} from "./mockData";

interface AppContextType {
  patients: Patient[];
  meals: Meal[];
  mealPlans: MealPlan[];
  inventoryItems: InventoryItem[];
  nutritionData: any[];
  dashboardStats: any;

  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;

  addMealPlan: (mealPlan: MealPlan) => void;
  updateMealPlan: (mealPlan: MealPlan) => void;
  deleteMealPlan: (id: string) => void;

  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (item: InventoryItem) => void;
  deleteInventoryItem: (id: string) => void;

  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(mockMealPlans);
  const [inventoryItems, setInventoryItems] =
    useState<InventoryItem[]>(mockInventoryItems);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  const addPatient = (patient: Patient) => {
    setPatients([...patients, patient]);
  };

  const updatePatient = (patient: Patient) => {
    setPatients(patients.map((p) => (p.id === patient.id ? patient : p)));
  };

  const deletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  const addMealPlan = (mealPlan: MealPlan) => {
    setMealPlans([...mealPlans, mealPlan]);
  };

  const updateMealPlan = (mealPlan: MealPlan) => {
    setMealPlans(
      mealPlans.map((mp) => (mp.id === mealPlan.id ? mealPlan : mp))
    );
  };

  const deleteMealPlan = (id: string) => {
    setMealPlans(mealPlans.filter((mp) => mp.id !== id));
  };

  const addInventoryItem = (item: InventoryItem) => {
    setInventoryItems([...inventoryItems, item]);
  };

  const updateInventoryItem = (item: InventoryItem) => {
    setInventoryItems(inventoryItems.map((i) => (i.id === item.id ? item : i)));
  };

  const deleteInventoryItem = (id: string) => {
    setInventoryItems(inventoryItems.filter((i) => i.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        patients,
        meals,
        mealPlans,
        inventoryItems,
        nutritionData: mockNutritionData,
        dashboardStats: mockDashboardStats,
        addPatient,
        updatePatient,
        deletePatient,
        addMealPlan,
        updateMealPlan,
        deleteMealPlan,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        selectedPatientId,
        setSelectedPatientId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
