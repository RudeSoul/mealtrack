import React, { useState, useEffect } from "react";
import { Meal } from "../../types/meal.types";
import Button from "../common/Button";

interface MealFormProps {
  meal?: Meal;
  onSave: (meal: Meal) => void;
  onCancel: () => void;
}

const defaultMeal: Meal = {
  id: "",
  name: "",
  type: "breakfast",
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  ingredients: [],
  dietaryTags: [],
};

const MealForm = ({ meal, onSave, onCancel }: MealFormProps) => {
  const [formData, setFormData] = useState<Meal>(
    meal || { ...defaultMeal, id: Date.now().toString() }
  );
  const [ingredient, setIngredient] = useState("");
  const [dietaryTag, setDietaryTag] = useState("");

  useEffect(() => {
    if (meal) {
      setFormData(meal);
    }
  }, [meal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0,
    });
  };

  const addIngredient = () => {
    if (ingredient.trim() !== "") {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, ingredient.trim()],
      });
      setIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const addDietaryTag = () => {
    if (dietaryTag.trim() !== "") {
      setFormData({
        ...formData,
        dietaryTags: [...formData.dietaryTags, dietaryTag.trim()],
      });
      setDietaryTag("");
    }
  };

  const removeDietaryTag = (index: number) => {
    setFormData({
      ...formData,
      dietaryTags: formData.dietaryTags.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Meal Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Meal Type
          </label>
          <select
            name="type"
            id="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="calories"
            className="block text-sm font-medium text-gray-700"
          >
            Calories
          </label>
          <input
            type="number"
            name="calories"
            id="calories"
            value={formData.calories}
            onChange={handleNumberChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="protein"
            className="block text-sm font-medium text-gray-700"
          >
            Protein (g)
          </label>
          <input
            type="number"
            name="protein"
            id="protein"
            value={formData.protein}
            onChange={handleNumberChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="carbs"
            className="block text-sm font-medium text-gray-700"
          >
            Carbs (g)
          </label>
          <input
            type="number"
            name="carbs"
            id="carbs"
            value={formData.carbs}
            onChange={handleNumberChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="fat"
            className="block text-sm font-medium text-gray-700"
          >
            Fat (g)
          </label>
          <input
            type="number"
            name="fat"
            id="fat"
            value={formData.fat}
            onChange={handleNumberChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ingredients
        </label>
        <div className="flex">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Add ingredient"
          />
          <Button type="button" onClick={addIngredient} className="ml-2">
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.ingredients.map((item, index) => (
            <div
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
            >
              {item}
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dietary Tags
        </label>
        <div className="flex">
          <input
            type="text"
            value={dietaryTag}
            onChange={(e) => setDietaryTag(e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Add dietary tag"
          />
          <Button type="button" onClick={addDietaryTag} className="ml-2">
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.dietaryTags.map((tag, index) => (
            <div
              key={index}
              className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeDietaryTag(index)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Meal</Button>
      </div>
    </form>
  );
};

export default MealForm;
