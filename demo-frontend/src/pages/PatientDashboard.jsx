import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { getUserDashboard } from "../services/practitionerService";
import { getOrders } from "../services/orderService";
import CalendarWidget from "../components/CalendarWidget";
import { format, isSameDay } from "date-fns";
import { generateGoogleCalendarUrl } from "../utils/calendarUtils";

const PatientDashboard = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Fetch dashboard data
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

  // Fetch orders
  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    fetchOrders();

  }, []);

  const name = userData?.userProfile?.name || "User";

  const sessionHistory = userData?.sessionHistory || [];

  const upcomingSessions = sessionHistory.filter(
      s => s.status === "booked" && new Date(s.date) > new Date()
  );

  const upcomingCount = upcomingSessions.length;

  const productOrders = orders.length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sessionsOnDate = sessionHistory.filter(s =>
      isSameDay(new Date(s.date), calendarDate)
  );

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
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

        <aside className="w-64 bg-emerald-800 text-white p-6 space-y-1 flex flex-col">

          <h2 className="text-2xl font-bold mb-4">WellnessHub</h2>

          <nav className="space-y-1 text-sm flex-1">

            <p className="px-3 py-2 bg-emerald-700 rounded-lg font-semibold cursor-pointer">
              Dashboard
            </p>

            <p
                onClick={() => navigate("/practitioners")}
                className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer"
            >
              Browse Practitioners
            </p>

            <p
                onClick={() => navigate("/my-sessions")}
                className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer"
            >
              My Sessions
            </p>
            <p
                onClick={() => navigate("/products")}
                className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer"
            >
              Products
            </p>

          </nav>

          <button
              onClick={handleLogout}
              className="mt-auto bg-emerald-700 px-4 py-2.5 rounded-xl hover:bg-emerald-600"
          >
            Logout
          </button>

        </aside>

        {/* Main Content */}

        <main className="flex-1 p-8 overflow-y-auto">

          {/* Greeting */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Hello, {name} 👋
            </h1>

            <p className="text-gray-500 mt-1">
              Here's an overview of your wellness journey.
            </p>

          </div>

          {/* Summary Cards */}

          <div className="grid md:grid-cols-3 gap-5 mb-8">

            <div className="bg-white p-6 rounded-2xl shadow-sm">

              <p className="text-sm text-gray-500">Upcoming Sessions</p>

              <p className="text-3xl font-bold text-emerald-600">
                {upcomingCount}
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">

              <p className="text-sm text-gray-500">Total Sessions</p>

              <p className="text-3xl font-bold text-emerald-600">
                {sessionHistory.length}
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">

              <p className="text-sm text-gray-500">Orders</p>

              <p className="text-3xl font-bold text-emerald-600">
                {productOrders}
              </p>

            </div>

          </div>

          {/* Orders Table */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">

            <h2 className="text-lg font-bold text-gray-800 mb-4">
              My Product Orders
            </h2>

            {orders.length === 0 ? (

                <p className="text-gray-500">No orders yet.</p>

            ) : (

                <table className="w-full text-sm">

                  <thead>

                  <tr className="border-b">

                    <th className="py-2 text-left">Product</th>
                    <th className="py-2 text-left">Price</th>
                    <th className="py-2 text-left">Quantity</th>

                  </tr>

                  </thead>

                  <tbody>

                  {orders.map(order => (

                      <tr key={order.id} className="border-b">

                        <td className="py-2">{order.productName}</td>

                        <td className="py-2">₹{order.price}</td>

                        <td className="py-2">{order.quantity}</td>

                      </tr>

                  ))}

                  </tbody>

                </table>

            )}

          </div>

          {/* Calendar */}

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <h2 className="text-lg font-bold mb-4">
              My Session Calendar
            </h2>

            <CalendarWidget
                onDateSelect={setCalendarDate}
                selectedDate={calendarDate}
            />

            {sessionsOnDate.length > 0 ? (

                <div className="mt-4 space-y-2">

                  {sessionsOnDate.map(s => (

                      <div key={s.id} className="p-3 bg-emerald-50 rounded-xl">

                        <p className="text-sm font-semibold">
                          Dr. {s.practitioner?.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {format(new Date(s.date), "hh:mm a")}
                        </p>

                        <a
                            href={generateGoogleCalendarUrl(s)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 text-xs"
                        >
                          Add to Calendar
                        </a>

                      </div>

                  ))}

                </div>

            ) : (

                <p className="text-gray-400 mt-3 text-sm">
                  No sessions on this day
                </p>

            )}

          </div>

        </main>

      </div>

  );
};

export default PatientDashboard;