import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import MealPlanning from "./pages/MealPlanning";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/meal-planning" element={<MealPlanning />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
