import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import PatientList from "../components/patients/PatientList";
import PatientForm from "../components/patients/PatientForm";
import Card from "../components/common/Card";
import { Patient } from "../types/patient.types";

const Patients = () => {
  const { patients, addPatient, updatePatient, setSelectedPatientId } =
    useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const handleAddPatient = () => {
    setEditingPatient(undefined);
    setShowForm(true);
  };

  const handleEditPatient = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    if (patient) {
      setEditingPatient(patient);
      setShowForm(true);
    }
  };

  const handleViewMeals = (id: string) => {
    setSelectedPatientId(id);
    navigate("/meal-planning");
  };

  const handleSavePatient = (patient: Patient) => {
    if (editingPatient) {
      updatePatient(patient);
    } else {
      addPatient(patient);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Patients</h1> */}

      {showForm ? (
        <Card title={editingPatient ? "Edit Patient" : "Add Patient"}>
          <PatientForm
            patient={editingPatient}
            onSave={handleSavePatient}
            onCancel={handleCancel}
          />
        </Card>
      ) : (
        <PatientList
          patients={patients}
          onAddPatient={handleAddPatient}
          onEditPatient={handleEditPatient}
          onViewMeals={handleViewMeals}
        />
      )}
    </div>
  );
};

export default Patients;
