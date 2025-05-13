import Card from "../common/Card";

interface DashboardStatsProps {
  stats: {
    totalPatients: number;
    mealsServedToday: number;
    dietaryCompliance: number;
    inventoryAlerts: number;
    patientSatisfaction: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-2 border-blue-100 rounded-lg">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-500 text-white">
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
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Patients</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.totalPatients}
            </p>
          </div>
        </div>
      </Card>

      <Card className="border-2 border-green-100 rounded-lg">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-500 text-white">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">
              Dietary Compliance
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.dietaryCompliance}%
            </p>
          </div>
        </div>
      </Card>

      <Card className="border-2 border-purple-100 rounded-lg">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-500 text-white">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">
              Meals Served Today
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.mealsServedToday}
            </p>
          </div>
        </div>
      </Card>

      <Card className="border-2 border-yellow-100 rounded-lg">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-500 text-white">
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
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">
              Inventory Alerts
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.inventoryAlerts}
            </p>
          </div>
        </div>
      </Card>

      <Card className="border-2 border-red-100 rounded-lg">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-500 text-white">
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
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">
              Patient Satisfaction
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.patientSatisfaction}/5
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;
