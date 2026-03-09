import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { getUserDashboard } from "../services/practitionerService";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getUserDashboard();
        setUserData(response.data);
      } catch (err) {
        setError("Failed to load dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const name = userData?.userProfile?.name || "User";
  const sessionHistory = userData?.sessionHistory?.length || 0;
  const productOrders = userData?.productOrders?.length || 0;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-emerald-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">WellnessHub</h2>

        <nav className="space-y-4 text-sm">
          <p className="hover:text-emerald-300 cursor-pointer">Dashboard</p>
          <p className="hover:text-emerald-300 cursor-pointer">Book Session</p>
          <p className="hover:text-emerald-300 cursor-pointer">My Orders</p>
          <p className="hover:text-emerald-300 cursor-pointer">Saved Practitioners</p>
          <p className="hover:text-emerald-300 cursor-pointer">Profile</p>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 bg-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Hello, {name} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your wellness journey.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Upcoming Sessions</p>
            <p className="text-2xl font-bold text-emerald-600 mt-2">{sessionHistory}</p>
            <p className="text-xs text-gray-400 mt-1">
              {sessionHistory === 0 ? "No sessions booked yet" : `${sessionHistory} upcoming`}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Orders</p>
            <p className="text-2xl font-bold text-emerald-600 mt-2">{productOrders}</p>
            <p className="text-xs text-gray-400 mt-1">
              {productOrders === 0 ? "No purchases yet" : `${productOrders} orders`}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Saved Practitioners</p>
            <p className="text-2xl font-bold text-emerald-600 mt-2">0</p>
            <p className="text-xs text-gray-400 mt-1">
              Feature coming soon
            </p>
          </div>

        </div>

        {/* Activity Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Recent Activity
          </h2>

          <div className="text-gray-500 text-sm">
            No activity yet.
            <span className="ml-2 text-emerald-600 font-medium">
              Start exploring therapies!
            </span>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Recommended For You
          </h2>

          <div className="h-32 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500 text-sm">
            Personalized recommendations will appear here
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">
            Notifications
          </h2>

          <p className="text-gray-500 text-sm">
            You have no new notifications.
          </p>
        </div>

      </main>
    </div>
  );
};

export default PatientDashboard;
