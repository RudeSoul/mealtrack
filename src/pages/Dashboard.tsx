import React from "react";
import { useAppContext } from "../context/AppContext";
import DashboardStats from "../components/dashboard/DashboardStats";
import NutritionComplianceChart from "../components/dashboard/NutritionComplianceChart";
import Card from "../components/common/Card";

const Dashboard = () => {
  const { dashboardStats, nutritionData, patients, inventoryItems } =
    useAppContext();

  const inventoryAlerts = inventoryItems.filter((item) => {
    const expirationDate = new Date(item.expirationDate);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= 7 || item.quantity < item.minimumStock;
  }).length;

  const updatedStats = {
    ...dashboardStats,
    totalPatients: patients.length,
    inventoryAlerts,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <DashboardStats stats={updatedStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <NutritionComplianceChart data={nutritionData} />

        <Card title="Recent Activity">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">New patient added</p>
                <p className="text-xs text-gray-500">
                  James Brown was added to Room 105E
                </p>
                <p className="text-xs text-gray-400">10 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Meal plan updated</p>
                <p className="text-xs text-gray-500">
                  John Smith's meal plan was updated for this week
                </p>
                <p className="text-xs text-gray-400">1 hour ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Inventory alert</p>
                <p className="text-xs text-gray-500">
                  Fresh Fruit is running low on stock
                </p>
                <p className="text-xs text-gray-400">3 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
