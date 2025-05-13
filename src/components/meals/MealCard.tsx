import React from "react";
import { Meal } from "../../types/meal.types";

interface MealCardProps {
  meal: Meal;
  onSelect?: () => void;
  selected?: boolean;
}

const MealCard = ({ meal, onSelect, selected = false }: MealCardProps) => {
  return (
    <div
      className={`
        border rounded-lg overflow-hidden shadow-sm transition-all
        ${onSelect ? "cursor-pointer hover:shadow-md" : ""}
        ${selected ? "ring-2 ring-blue-500" : ""}
      `}
      onClick={onSelect}
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
  );
};

export default MealCard;
