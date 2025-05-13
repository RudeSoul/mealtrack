import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../common/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NutritionComplianceChartProps {
  data: {
    period: string;
    calorieTarget: number;
    calorieActual: number;
    proteinTarget: number;
    proteinActual: number;
    carbsTarget: number;
    carbsActual: number;
    fatTarget: number;
    fatActual: number;
  }[];
}

const NutritionComplianceChart = ({ data }: NutritionComplianceChartProps) => {
  const chartData: ChartData<"bar"> = {
    labels: data.map((item) => item.period),
    datasets: [
      {
        label: "Calorie Target",
        data: data.map((item) => item.calorieTarget),
        backgroundColor: "rgba(53, 162, 235, 0.3)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Calorie Actual",
        data: data.map((item) => item.calorieActual),
        backgroundColor: "rgba(53, 162, 235, 0.7)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Protein Target",
        data: data.map((item) => item.proteinTarget),
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Protein Actual",
        data: data.map((item) => item.proteinActual),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nutritional Compliance",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const calorieCompliance = Math.round(
    (data.reduce((sum, item) => sum + item.calorieActual, 0) /
      data.reduce((sum, item) => sum + item.calorieTarget, 0)) *
      100
  );

  const proteinCompliance = Math.round(
    (data.reduce((sum, item) => sum + item.proteinActual, 0) /
      data.reduce((sum, item) => sum + item.proteinTarget, 0)) *
      100
  );

  return (
    <Card className="p-0">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Nutritional Compliance</h3>
      </div>
      <div className="p-4">
        <Bar data={chartData} options={options} />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-sm">Calorie Compliance</h4>
            <p className="text-2xl font-bold">{calorieCompliance}%</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-medium text-sm">Protein Compliance</h4>
            <p className="text-2xl font-bold">{proteinCompliance}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NutritionComplianceChart;
