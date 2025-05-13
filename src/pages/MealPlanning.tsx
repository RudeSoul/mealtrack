import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import MealPlannerCalendar from "../components/meals/MealPlannerCalendar";
import MealForm from "../components/meals/MealForm";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { Meal, MealPlan } from "../types/meal.types";

const MealPlanning = () => {
  const {
    patients,
    meals,
    mealPlans,
    selectedPatientId,
    setSelectedPatientId,
    addMealPlan,
    updateMealPlan,
  } = useAppContext();

  const [showMealForm, setShowMealForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<string>("");
  const [editingMealPlanId, setEditingMealPlanId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!selectedPatientId && patients.length > 0) {
      setSelectedPatientId(patients[0].id);
    }
  }, [patients, selectedPatientId, setSelectedPatientId]);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPatientId(e.target.value);
  };

  const handleAddMeal = (date: string, mealType: string) => {
    setSelectedDate(date);
    setSelectedMealType(mealType);
    setEditingMealPlanId(null);
    setShowMealForm(true);
  };

  const handleEditMeal = (mealPlanId: string, mealType: string) => {
    setEditingMealPlanId(mealPlanId);
    setSelectedMealType(mealType);
    setShowMealForm(true);
  };

  const handleSaveMeal = (meal: Meal) => {
    if (!selectedPatientId || !selectedDate) return;

    const existingMealPlan = mealPlans.find(
      (mp) => mp.patientId === selectedPatientId && mp.date === selectedDate
    );

    if (existingMealPlan) {
      const updatedMeals = { ...existingMealPlan.meals };

      if (selectedMealType === "snack") {
        updatedMeals.snacks = [meal];
      } else {
        updatedMeals[selectedMealType as "breakfast" | "lunch" | "dinner"] =
          meal;
      }

      const nutritionTotals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };

      if (updatedMeals.breakfast) {
        nutritionTotals.calories += updatedMeals.breakfast.calories;
        nutritionTotals.protein += updatedMeals.breakfast.protein;
        nutritionTotals.carbs += updatedMeals.breakfast.carbs;
        nutritionTotals.fat += updatedMeals.breakfast.fat;
      }

      if (updatedMeals.lunch) {
        nutritionTotals.calories += updatedMeals.lunch.calories;
        nutritionTotals.protein += updatedMeals.lunch.protein;
        nutritionTotals.carbs += updatedMeals.lunch.carbs;
        nutritionTotals.fat += updatedMeals.lunch.fat;
      }

      if (updatedMeals.dinner) {
        nutritionTotals.calories += updatedMeals.dinner.calories;
        nutritionTotals.protein += updatedMeals.dinner.protein;
        nutritionTotals.carbs += updatedMeals.dinner.carbs;
        nutritionTotals.fat += updatedMeals.dinner.fat;
      }

      updatedMeals.snacks.forEach((snack) => {
        nutritionTotals.calories += snack.calories;
        nutritionTotals.protein += snack.protein;
        nutritionTotals.carbs += snack.carbs;
        nutritionTotals.fat += snack.fat;
      });

      const updatedMealPlan: MealPlan = {
        ...existingMealPlan,
        meals: updatedMeals,
        nutritionTotals,
      };

      updateMealPlan(updatedMealPlan);
    } else {
      const newMeals: {
        breakfast?: Meal;
        lunch?: Meal;
        dinner?: Meal;
        snacks: Meal[];
      } = {
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
        snacks: [],
      };

      if (selectedMealType === "snack") {
        newMeals.snacks = [meal];
      } else {
        newMeals[selectedMealType as "breakfast" | "lunch" | "dinner"] = meal;
      }

      const newMealPlan: MealPlan = {
        id: Date.now().toString(),
        patientId: selectedPatientId,
        date: selectedDate,
        meals: newMeals,
        nutritionTotals: {
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fat: meal.fat,
        },
      };

      addMealPlan(newMealPlan);
    }

    setShowMealForm(false);
  };

  const handleCancelMeal = () => {
    setShowMealForm(false);
  };

  if (!selectedPatient) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Meal Planning</h1>
        <p>No patients available. Please add a patient first.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meal Planning</h1>

        <div className="flex items-center">
          <label htmlFor="patient-select" className="mr-2 text-sm font-medium">
            Select Patient:
          </label>
          <select
            id="patient-select"
            value={selectedPatientId || ""}
            onChange={handlePatientChange}
            className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name} (Room {patient.room})
              </option>
            ))}
          </select>
        </div>
      </div>

      {showMealForm ? (
        <Card title={`Add ${selectedMealType} for ${selectedPatient.name}`}>
          <MealForm onSave={handleSaveMeal} onCancel={handleCancelMeal} />
        </Card>
      ) : (
        <MealPlannerCalendar
          patient={selectedPatient}
          mealPlans={mealPlans.filter(
            (mp) => mp.patientId === selectedPatientId
          )}
          onAddMeal={handleAddMeal}
          onEditMeal={handleEditMeal}
        />
      )}

      <div className="mt-6">
        <Card title="Available Meals">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <div className="h-24 bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl">
                    {meal.type === "breakfast"
                      ? "🍳"
                      : meal.type === "lunch"
                      ? "🥗"
                      : meal.type === "dinner"
                      ? "🍽️"
                      : "🍎"}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900">{meal.name}</h3>
                  <div className="mt-1 flex justify-between text-sm text-gray-500">
                    <span>{meal.calories} cal</span>
                    <span>{meal.protein}g protein</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {meal.dietaryTags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MealPlanning;
