import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { getSessions } from "../services/sessionService";
import CalendarWidget from "../components/CalendarWidget";
import { format, isSameDay } from "date-fns";

const PractitionerDashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const name = localStorage.getItem("name") || "Doctor";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getSessions();
        setSessions(response.data);
      } catch (err) {
        setError("Failed to load dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Sessions on the calendar-selected date
  const sessionsOnSelectedDate = sessions.filter(s =>
    isSameDay(new Date(s.date), calendarDate)
  );

  // Upcoming booked sessions (sorted)
  const upcomingSessions = sessions
    .filter(s => s.status === "booked" && new Date(s.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Stats
  const bookedCount = sessions.filter(s => s.status === "booked").length;
  const completedCount = sessions.filter(s => s.status === "completed").length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 space-y-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-2">WellnessHub</h2>
        <nav className="space-y-1 text-sm flex-1">
          <p className="px-3 py-2 bg-blue-800 rounded-lg font-semibold cursor-pointer">Dashboard</p>
          <p onClick={() => navigate("/my-sessions")} className="px-3 py-2 hover:bg-blue-800 rounded-lg cursor-pointer transition">Appointments</p>
          <p onClick={() => navigate("/availability")} className="px-3 py-2 hover:bg-blue-800 rounded-lg cursor-pointer transition">Manage Availability</p>
          <p onClick={() => navigate("/practitioner-profile")} className="px-3 py-2 hover:bg-blue-800 rounded-lg cursor-pointer transition">Profile</p>
        </nav>
        <button onClick={handleLogout} className="mt-auto bg-blue-700 px-4 py-2.5 rounded-xl hover:bg-blue-600 transition w-full font-semibold text-sm">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Hello, Dr. {name} 👋</h1>
          <p className="text-gray-500 mt-1">Manage your patients and session availability.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Upcoming Sessions</p>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{bookedCount}</p>
            <p className="text-xs text-gray-400 mt-1">Booked & pending</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Completed Sessions</p>
            <p className="text-3xl font-extrabold text-green-600 mt-2">{completedCount}</p>
            <p className="text-xs text-gray-400 mt-1">All time</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Sessions</p>
            <p className="text-3xl font-extrabold text-gray-700 mt-2">{sessions.length}</p>
            <p className="text-xs text-gray-400 mt-1">All statuses</p>
          </div>
        </div>

        {/* Calendar + Sessions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-gray-800 mb-1">Session Calendar</h2>
            <p className="text-xs text-gray-500 mb-4">Click a date to view sessions on that day</p>
            <CalendarWidget onDateSelect={setCalendarDate} selectedDate={calendarDate} />
            {sessionsOnSelectedDate.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  {format(calendarDate, "MMM d")} — {sessionsOnSelectedDate.length} session{sessionsOnSelectedDate.length !== 1 ? "s" : ""}
                </p>
                {sessionsOnSelectedDate.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                    <div>
                      <p className="text-xs font-bold text-blue-900">{s.client?.name}</p>
                      <p className="text-xs text-blue-600">{format(new Date(s.date), "hh:mm a")}</p>
                    </div>
                    <button onClick={() => navigate(`/sessions/${s.id}`)} className="text-blue-600 text-xs font-bold hover:underline">View</button>
                  </div>
                ))}
              </div>
            )}
            {sessionsOnSelectedDate.length === 0 && (
              <p className="mt-4 text-xs text-gray-400 text-center">No sessions on {format(calendarDate, "MMMM d")}</p>
            )}
          </div>

          {/* Upcoming Sessions */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800">Upcoming Appointments</h2>
              <button onClick={() => navigate("/my-sessions")} className="text-xs text-blue-600 font-bold hover:underline">View all</button>
            </div>
            {upcomingSessions.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {upcomingSessions.slice(0, 5).map(session => (
                  <div key={session.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold text-sm">
                        {session.client?.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{session.client?.name}</p>
                        <p className="text-xs text-gray-500">{format(new Date(session.date), "MMM d, yyyy · hh:mm a")}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/sessions/${session.id}`)}
                      className="text-blue-600 text-xs font-bold hover:underline"
                    >
                      View Notes
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 text-sm">No upcoming appointments.</p>
                <button
                  onClick={() => navigate("/availability")}
                  className="mt-3 text-blue-600 text-sm font-bold hover:underline"
                >
                  Add availability slots →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-gray-800 mb-1">Manage Availability</h2>
            <p className="text-sm text-gray-500 mb-5">Add or remove time slots for patient bookings.</p>
            <button
              onClick={() => navigate("/availability")}
              className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
            >
              Open Availability Manager
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-gray-800 mb-1">Session History</h2>
            <p className="text-sm text-gray-500 mb-5">Review all past and upcoming therapy sessions.</p>
            <button
              onClick={() => navigate("/my-sessions")}
              className="w-full py-3.5 bg-gray-800 text-white rounded-2xl font-bold hover:bg-gray-700 transition"
            >
              View All Sessions
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PractitionerDashboard;