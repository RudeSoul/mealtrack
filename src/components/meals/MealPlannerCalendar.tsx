import React, { useState } from "react";
import { MealPlan } from "../../types/meal.types";
import { Patient } from "../../types/patient.types";
import Button from "../common/Button";
import { format, addDays, startOfWeek, subWeeks, addWeeks } from "date-fns";

interface MealPlannerCalendarProps {
  patient: Patient;
  mealPlans: MealPlan[];
  onAddMeal: (date: string, mealType: string) => void;
  onEditMeal: (mealPlanId: string, mealType: string) => void;
}

const MealPlannerCalendar = ({
  patient,
  mealPlans,
  onAddMeal,
  onEditMeal,
}: MealPlannerCalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(startOfWeek(new Date()));

  const getDaysOfWeek = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(currentWeek, i));
    }
    return days;
  };

  const weekDays = getDaysOfWeek();

  const formatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  const getMealPlanForDate = (date: string) => {
    return mealPlans.find(
      (plan) => plan.date === date && plan.patientId === patient.id
    );
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const renderMealCell = (
    date: string,
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
  ) => {
    const mealPlan = getMealPlanForDate(date);
    let meal;

    if (mealPlan) {
      if (mealType === "snack") {
        meal = mealPlan.meals.snacks[0];
      } else {
        meal = mealPlan.meals[mealType];
      }
    }

    if (meal) {
      return (
        <div
          className="p-2 bg-white border rounded shadow-sm cursor-pointer hover:bg-blue-50 transition"
          onClick={() => onEditMeal(mealPlan!.id, mealType)}
        >
          <p className="font-medium text-sm truncate">{meal.name}</p>
          <p className="text-xs text-gray-500">{meal.calories} cal</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {meal.dietaryTags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-800 text-xs px-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        className="p-2 border border-dashed rounded bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition"
        onClick={() => onAddMeal(date, mealType)}
      >
        <p className="text-xs text-gray-400">+ Add {mealType}</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Meal Plan: {patient.name}</h2>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={goToPreviousWeek}>
            &larr; Previous
          </Button>
          <Button variant="secondary" size="sm" onClick={goToNextWeek}>
            Next &rarr;
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b"></th>
              {weekDays.map((day, index) => (
                <th key={index} className="p-2 border-b text-center">
                  <p className="font-medium">{format(day, "EEE")}</p>
                  <p className="text-sm text-gray-500">
                    {format(day, "MMM d")}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b font-medium">Breakfast</td>
              {weekDays.map((day, index) => (
                <td key={index} className="p-2 border-b">
                  {renderMealCell(formatDate(day), "breakfast")}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-2 border-b font-medium">Lunch</td>
              {weekDays.map((day, index) => (
                <td key={index} className="p-2 border-b">
                  {renderMealCell(formatDate(day), "lunch")}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-2 border-b font-medium">Dinner</td>
              {weekDays.map((day, index) => (
                <td key={index} className="p-2 border-b">
                  {renderMealCell(formatDate(day), "dinner")}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-medium">Snack</td>
              {weekDays.map((day, index) => (
                <td key={index} className="p-2">
                  {renderMealCell(formatDate(day), "snack")}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h3 className="font-medium mb-2">Dietary Notes</h3>
        <p className="text-sm">
          <span className="font-medium">Restrictions:</span>{" "}
          {patient.dietaryRestrictions.join(", ") || "None"}
        </p>
        <p className="text-sm">
          <span className="font-medium">Allergies:</span>{" "}
          {patient.allergies.join(", ") || "None"}
        </p>
        <p className="text-sm">
          <span className="font-medium">Daily Targets:</span>{" "}
          {patient.nutritionalRequirements.calories} calories,
          {patient.nutritionalRequirements.protein}g protein
        </p>
      </div>
    </div>
  );
};

export default MealPlannerCalendar;
