import React from "react";
import { Patient } from "../../types/patient.types";
import PatientCard from "./PatientCard";
import Button from "../common/Button";

interface PatientListProps {
  patients: Patient[];
  onAddPatient: () => void;
  onEditPatient: (id: string) => void;
  onViewMeals: (id: string) => void;
}

const PatientList = ({
  patients,
  onAddPatient,
  onEditPatient,
  onViewMeals,
}: PatientListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <Button onClick={onAddPatient}>Add Patient</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onEdit={onEditPatient}
            onViewMeals={onViewMeals}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientList;
