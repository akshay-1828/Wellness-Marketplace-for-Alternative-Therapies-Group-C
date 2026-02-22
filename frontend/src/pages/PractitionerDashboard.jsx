import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const PractitionerDashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Doctor";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">WellnessHub</h2>

        <nav className="space-y-4 text-sm">
          <p className="hover:text-blue-300 cursor-pointer">Dashboard</p>
          <p className="hover:text-blue-300 cursor-pointer">Appointments</p>
          <p className="hover:text-blue-300 cursor-pointer">Patients</p>
          <p className="hover:text-blue-300 cursor-pointer">Analytics</p>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Hello, {name} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your professional activity.
          </p>
        </div>

        {/* Activity Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Today's Activity
          </h2>

          <div className="text-gray-500 text-sm">
            No sessions scheduled yet.
            <span className="ml-2 text-blue-600 font-medium">
              (Feature coming soon)
            </span>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Performance Insights
          </h2>

          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Analytics module under development
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">
            Notifications
          </h2>

          <p className="text-gray-500 text-sm">
            No notifications at the moment.
          </p>
        </div>

      </main>
    </div>
  );
};

export default PractitionerDashboard;
