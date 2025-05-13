import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Patients", href: "/patients" },
    { name: "Meal Planning", href: "/meal-planning" },
    { name: "Inventory", href: "/inventory" },
    { name: "Reports", href: "/reports" },
  ];

  return (
    <div className="h-screen flex-shrink-0 w-64 bg-white shadow-md">
      <div className="h-16 flex items-center px-6 border-b">
        <span className="text-xl font-bold text-blue-600">MealTrack</span>
      </div>
      <nav className="mt-5 px-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
