import React, { useState, useEffect } from "react";
import { Patient } from "../../types/patient.types";
import Button from "../common/Button";

interface PatientFormProps {
  patient?: Patient;
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}

const defaultPatient: Patient = {
  id: "",
  name: "",
  room: "",
  dietaryRestrictions: [],
  allergies: [],
  nutritionalRequirements: {
    calories: 2000,
    protein: 75,
    carbs: 250,
    fat: 65,
  },
};

const PatientForm = ({ patient, onSave, onCancel }: PatientFormProps) => {
  const [formData, setFormData] = useState<Patient>(
    patient || { ...defaultPatient, id: Date.now().toString() }
  );
  const [dietaryRestriction, setDietaryRestriction] = useState("");
  const [allergy, setAllergy] = useState("");

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof Patient] as any),
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof Patient] as any),
          [child]: parseInt(value) || 0,
        },
      });
    }
  };

  const addDietaryRestriction = () => {
    if (dietaryRestriction.trim() !== "") {
      setFormData({
        ...formData,
        dietaryRestrictions: [
          ...formData.dietaryRestrictions,
          dietaryRestriction.trim(),
        ],
      });
      setDietaryRestriction("");
    }
  };

  const removeDietaryRestriction = (index: number) => {
    setFormData({
      ...formData,
      dietaryRestrictions: formData.dietaryRestrictions.filter(
        (_, i) => i !== index
      ),
    });
  };

  const addAllergy = () => {
    if (allergy.trim() !== "") {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, allergy.trim()],
      });
      setAllergy("");
    }
  };

  const removeAllergy = (index: number) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter((_, i) => i !== index),
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
            Patient Name
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
            htmlFor="room"
            className="block text-sm font-medium text-gray-700"
          >
            Room Number
          </label>
          <input
            type="text"
            name="room"
            id="room"
            required
            value={formData.room}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dietary Restrictions
        </label>
        <div className="flex">
          <input
            type="text"
            value={dietaryRestriction}
            onChange={(e) => setDietaryRestriction(e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Add dietary restriction"
          />
          <Button
            type="button"
            onClick={addDietaryRestriction}
            className="ml-2"
          >
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.dietaryRestrictions.map((restriction, index) => (
            <div
              key={index}
              className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full flex items-center"
            >
              {restriction}
              <button
                type="button"
                onClick={() => removeDietaryRestriction(index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allergies
        </label>
        <div className="flex">
          <input
            type="text"
            value={allergy}
            onChange={(e) => setAllergy(e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Add allergy"
          />
          <Button type="button" onClick={addAllergy} className="ml-2">
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.allergies.map((item, index) => (
            <div
              key={index}
              className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full flex items-center"
            >
              {item}
              <button
                type="button"
                onClick={() => removeAllergy(index)}
                className="ml-2 text-yellow-600 hover:text-yellow-800"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Nutritional Requirements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="nutritionalRequirements.calories"
              className="block text-xs font-medium text-gray-500"
            >
              Calories
            </label>
            <input
              type="number"
              name="nutritionalRequirements.calories"
              id="nutritionalRequirements.calories"
              value={formData.nutritionalRequirements.calories}
              onChange={handleNumberChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="nutritionalRequirements.protein"
              className="block text-xs font-medium text-gray-500"
            >
              Protein (g)
            </label>
            <input
              type="number"
              name="nutritionalRequirements.protein"
              id="nutritionalRequirements.protein"
              value={formData.nutritionalRequirements.protein}
              onChange={handleNumberChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="nutritionalRequirements.carbs"
              className="block text-xs font-medium text-gray-500"
            >
              Carbs (g)
            </label>
            <input
              type="number"
              name="nutritionalRequirements.carbs"
              id="nutritionalRequirements.carbs"
              value={formData.nutritionalRequirements.carbs}
              onChange={handleNumberChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="nutritionalRequirements.fat"
              className="block text-xs font-medium text-gray-500"
            >
              Fat (g)
            </label>
            <input
              type="number"
              name="nutritionalRequirements.fat"
              id="nutritionalRequirements.fat"
              value={formData.nutritionalRequirements.fat}
              onChange={handleNumberChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Patient</Button>
      </div>
    </form>
  );
};

export default PatientForm;
