import React from "react";
import { Patient } from "../../types/patient.types";
import Button from "../common/Button";

interface PatientCardProps {
  patient: Patient;
  onEdit: (id: string) => void;
  onViewMeals: (id: string) => void;
}

const PatientCard = ({ patient, onEdit, onViewMeals }: PatientCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 hover:border-blue-500">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{patient.name}</h3>
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
          Room: {patient.room}
        </span>
      </div>

      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700">
          Dietary Restrictions:
        </h4>
        <div className="flex flex-wrap gap-1 mt-1">
          {patient.dietaryRestrictions.map((restriction, index) => (
            <span
              key={index}
              className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
            >
              {restriction}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700">Allergies:</h4>
        <div className="flex flex-wrap gap-1 mt-1">
          {patient.allergies.map((allergy, index) => (
            <span
              key={index}
              className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
            >
              {allergy}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4 text-center">
        <div className="bg-blue-50 p-2 rounded">
          <p className="text-xs text-gray-500">Calories</p>
          <p className="font-medium">
            {patient.nutritionalRequirements.calories}
          </p>
        </div>
        <div className="bg-green-50 p-2 rounded">
          <p className="text-xs text-gray-500">Protein</p>
          <p className="font-medium">
            {patient.nutritionalRequirements.protein}g
          </p>
        </div>
        <div className="bg-purple-50 p-2 rounded">
          <p className="text-xs text-gray-500">Carbs</p>
          <p className="font-medium">
            {patient.nutritionalRequirements.carbs}g
          </p>
        </div>
        <div className="bg-orange-50 p-2 rounded">
          <p className="text-xs text-gray-500">Fat</p>
          <p className="font-medium">{patient.nutritionalRequirements.fat}g</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(patient.id)}
        >
          Edit Profile
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onViewMeals(patient.id)}
        >
          View Meal Plan
        </Button>
      </div>
    </div>
  );
};

export default PatientCard;
