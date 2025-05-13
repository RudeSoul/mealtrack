import React from "react";
import { useAppContext } from "../context/AppContext";
import NutritionComplianceChart from "../components/dashboard/NutritionComplianceChart";
import Card from "../components/common/Card";

const Reports = () => {
  const { nutritionData, patients, mealPlans, inventoryItems } =
    useAppContext();

  const inventoryValue = inventoryItems.reduce((total, item) => {
    return total + item.quantity * item.cost;
  }, 0);

  const mealsServed = mealPlans.reduce((total, plan) => {
    let count = 0;
    if (plan.meals.breakfast) count++;
    if (plan.meals.lunch) count++;
    if (plan.meals.dinner) count++;
    count += plan.meals.snacks.length;
    return total + count;
  }, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-blue-50">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Total Patients
            </h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {patients.length}
            </p>
          </div>
        </Card>

        <Card className="bg-green-50">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Meals Served</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {mealsServed}
            </p>
          </div>
        </Card>

        <Card className="bg-purple-50">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Inventory Value
            </h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              ${inventoryValue.toFixed(2)}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutritionComplianceChart data={nutritionData} />

        <Card title="Dietary Restrictions">
          <div className="space-y-4">
            {Array.from(
              new Set(patients.flatMap((p) => p.dietaryRestrictions))
            ).map((restriction, index) => {
              const count = patients.filter((p) =>
                p.dietaryRestrictions.includes(restriction)
              ).length;
              const percentage = Math.round((count / patients.length) * 100);

              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{restriction}</span>
                    <span className="text-sm text-gray-500">
                      {count} patients ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
