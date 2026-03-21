// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../services/authService";
// import { getPractitionerProfileByUserId, getUserDashboard } from "../services/practitionerService";
// import CalendarWidget from "../components/CalendarWidget";
// import { format, isSameDay } from "date-fns";
// import { generateGoogleCalendarUrl } from "../utils/calendarUtils";

// const PatientDashboard = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [calendarDate, setCalendarDate] = useState(new Date());
//   const [practitionerProfiles, setPractitionerProfiles] = useState({});

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const response = await getUserDashboard();
//         setUserData(response.data);
//       } catch (err) {
//         setError("Failed to load dashboard");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   useEffect(() => {
//     const loadPractitionerProfiles = async () => {
//       const sessionHistory = userData?.sessionHistory || [];
//       const practitionerUserIds = Array.from(
//         new Set(sessionHistory.map(s => s?.practitioner?.id).filter(Boolean))
//       );

//       const missing = practitionerUserIds.filter(id => practitionerProfiles[id] === undefined);
//       if (missing.length === 0) return;

//       try {
//         const results = await Promise.all(
//           missing.map(async (id) => {
//             try {
//               const res = await getPractitionerProfileByUserId(id);
//               return [id, res.data];
//             } catch (e) {
//               return [id, null];
//             }
//           })
//         );

//         setPractitionerProfiles(prev => {
//           const next = { ...prev };
//           for (const [id, profile] of results) {
//             next[id] = profile;
//           }
//           return next;
//         });
//       } catch (e) {
//         // ignore
//       }
//     };

//     if (userData) loadPractitionerProfiles();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userData]);

//   const name = userData?.userProfile?.name || "User";
//   const sessionHistory = userData?.sessionHistory || [];
//   const upcomingSessions = sessionHistory.filter(s => s.status === "booked" && new Date(s.date) > new Date());
//   const upcomingCount = upcomingSessions.length;
//   const productOrders = userData?.productOrders?.length || 0;

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // Sessions falling on the calendar selected date
//   const sessionsOnDate = sessionHistory.filter(s =>
//     isSameDay(new Date(s.date), calendarDate)
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-emerald-800 text-white p-6 space-y-1 flex flex-col">
//         <h2 className="text-2xl font-bold mb-4">WellnessHub</h2>
//         <nav className="space-y-1 text-sm flex-1">
//           <p className="px-3 py-2 bg-emerald-700 rounded-lg font-semibold cursor-pointer">Dashboard</p>
//           <p onClick={() => navigate("/practitioners")} className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer transition">Browse Practitioners</p>
//           <p onClick={() => navigate("/my-sessions")} className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer transition">My Sessions</p>
//           <p onClick={() => navigate("/products")} className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer transition">Wellness Products</p>
//           <p onClick={() => navigate("/community")} className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer transition">Community Q&A</p>
//           <p onClick={() => navigate("/my-orders")} className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer transition">My Orders</p>
//           <p onClick={() => navigate("/wishlist")} className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer transition">Wishlist</p>
//           <p className="px-3 py-2 hover:bg-emerald-700 rounded-lg cursor-pointer transition opacity-50">Profile</p>
//         </nav>
//         <button onClick={handleLogout} className="mt-auto bg-emerald-700 px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition font-semibold text-sm w-full">
//           Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         {/* Greeting */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Hello, {name} 👋</h1>
//           <p className="text-gray-500 mt-1">Here's an overview of your wellness journey.</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid md:grid-cols-3 gap-5 mb-8">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//             <p className="text-sm text-gray-500 font-medium">Upcoming Sessions</p>
//             <p className="text-3xl font-extrabold text-emerald-600 mt-2">{upcomingCount}</p>
//             <p className="text-xs text-gray-400 mt-1">{upcomingCount === 0 ? "No sessions booked yet" : `${upcomingCount} upcoming`}</p>
//           </div>
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//             <p className="text-sm text-gray-500 font-medium">Total Sessions</p>
//             <p className="text-3xl font-extrabold text-emerald-600 mt-2">{sessionHistory.length}</p>
//             <p className="text-xs text-gray-400 mt-1">All time</p>
//           </div>
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//             <p className="text-sm text-gray-500 font-medium">Orders</p>
//             <p className="text-3xl font-extrabold text-emerald-600 mt-2">{productOrders}</p>
//             <p className="text-xs text-gray-400 mt-1">{productOrders === 0 ? "No purchases yet" : `${productOrders} orders`}</p>
//           </div>
//         </div>

//         {/* Calendar + Session Reminders */}
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
//           {/* Session Calendar */}
//           <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-base font-bold text-gray-800 mb-1">My Session Calendar</h2>
//             <p className="text-xs text-gray-500 mb-4">Click a date to see scheduled sessions</p>
//             <CalendarWidget onDateSelect={setCalendarDate} selectedDate={calendarDate} />
//             {sessionsOnDate.length > 0 ? (
//               <div className="mt-4 space-y-2">
//                 <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
//                   {format(calendarDate, "MMM d")} — {sessionsOnDate.length} session{sessionsOnDate.length !== 1 ? "s" : ""}
//                 </p>
//                 {sessionsOnDate.map(s => (
//                   <div key={s.id} className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
//                     <p className="text-xs font-bold text-emerald-900">Dr. {s.practitioner?.name}</p>
//                     {(() => {
//                       const profile = practitionerProfiles[s?.practitioner?.id];
//                       if (!profile) return null;
//                       const parts = [];
//                       if (profile.specialization) parts.push(profile.specialization);
//                       if (profile.experienceYears != null) parts.push(`${profile.experienceYears} yrs exp`);
//                       if (parts.length === 0) return null;
//                       return (
//                         <p className="text-[11px] text-emerald-700 mt-0.5">{parts.join(" · ")}</p>
//                       );
//                     })()}
//                     <p className="text-xs text-emerald-600">{format(new Date(s.date), "hh:mm a")}</p>
//                     <div className="flex gap-2 mt-2">
//                       <button onClick={() => navigate(`/sessions/${s.id}`)} className="text-emerald-700 text-xs font-bold hover:underline">
//                         View
//                       </button>
//                       {s.status === "booked" && (
//                         <a href={generateGoogleCalendarUrl(s)} target="_blank" rel="noopener noreferrer"
//                           className="text-indigo-600 text-xs font-bold hover:underline">
//                           + Calendar
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="mt-4 text-xs text-gray-400 text-center">No sessions on {format(calendarDate, "MMMM d")}</p>
//             )}
//           </div>

//           {/* Upcoming Sessions + Reminders */}
//           <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
//               <h2 className="text-base font-bold text-gray-800">Upcoming Sessions & Reminders</h2>
//               <button onClick={() => navigate("/my-sessions")} className="text-xs text-emerald-600 font-bold hover:underline">View all</button>
//             </div>

//             {upcomingSessions.length > 0 ? (
//               <div className="divide-y divide-gray-50">
//                 {upcomingSessions.slice(0, 5).map(session => {
//                   const sessionDate = new Date(session.date);
//                   const msUntil = sessionDate - new Date();
//                   const hoursUntil = msUntil / (1000 * 60 * 60);
//                   const isSoon = hoursUntil > 0 && hoursUntil <= 24;
//                   const isVeryClose = hoursUntil > 0 && hoursUntil <= 1;

//                   return (
//                     <div key={session.id} className={`px-6 py-4 hover:bg-gray-50 transition ${isSoon ? "border-l-4 border-amber-400" : ""}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${isSoon ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
//                             {session.practitioner?.name?.charAt(0)}
//                           </div>
//                           <div>
//                             <p className="font-bold text-gray-900 text-sm">Dr. {session.practitioner?.name}</p>
//                             {(() => {
//                               const profile = practitionerProfiles[session?.practitioner?.id];
//                               if (!profile) return null;
//                               const parts = [];
//                               if (profile.specialization) parts.push(profile.specialization);
//                               if (profile.experienceYears != null) parts.push(`${profile.experienceYears} yrs exp`);
//                               if (parts.length === 0) return null;
//                               return (
//                                 <p className="text-[11px] text-emerald-700 mt-0.5">{parts.join(" · ")}</p>
//                               );
//                             })()}
//                             <p className="text-xs text-gray-500">{format(new Date(session.date), "MMM d, yyyy · hh:mm a")}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {isVeryClose && (
//                             <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">NOW</span>
//                           )}
//                           {isSoon && !isVeryClose && (
//                             <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">SOON</span>
//                           )}
//                           <button onClick={() => navigate(`/sessions/${session.id}`)} className="text-emerald-600 text-xs font-bold hover:underline">Details</button>
//                         </div>
//                       </div>
//                       {session.notes && (
//                         <p className="mt-2 text-xs text-gray-500 italic ml-13">&ldquo;{session.notes}&rdquo;</p>
//                       )}
//                       {isSoon && (
//                         <div className="mt-2 flex items-center gap-3 ml-1">
//                           <p className="text-xs text-amber-700 font-medium">
//                             {isVeryClose ? "Starting in less than 1 hour!" : `Starting in ${Math.round(hoursUntil)} hours`}
//                           </p>
//                           <a href={generateGoogleCalendarUrl(session)} target="_blank" rel="noopener noreferrer"
//                             className="text-xs text-indigo-600 font-bold hover:underline">+ Add to Calendar</a>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="px-6 py-12 text-center">
//                 <p className="text-gray-500 text-sm">No upcoming sessions.</p>
//                 <button onClick={() => navigate("/practitioners")} className="mt-3 text-emerald-600 text-sm font-bold hover:underline">
//                   Book your first session →
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom Actions + Notifications */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-base font-bold text-gray-800 mb-1">Find a Practitioner</h2>
//             <p className="text-sm text-gray-500 mb-5">Browse verified therapists and book a session.</p>
//             <button onClick={() => navigate("/practitioners")}
//               className="w-full py-3.5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100">
//               Browse Practitioners
//             </button>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-base font-bold text-gray-800 mb-3">Notifications</h2>
//             {upcomingSessions.length > 0 ? (
//               <div className="space-y-2">
//                 {upcomingSessions.slice(0, 2).map(s => {
//                   const hrs = (new Date(s.date) - new Date()) / (1000 * 60 * 60);
//                   return (
//                     <div key={s.id} className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
//                       <p className="text-xs text-blue-700 font-medium">
//                         Session with Dr. {s.practitioner?.name} on {format(new Date(s.date), "MMM d")}
//                         {hrs < 24 && hrs > 0 && " — starting soon!"}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm">No new notifications.</p>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PatientDashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import {
  getPractitionerProfileByUserId,
  getUserDashboard,
} from "../services/practitionerService";
import CalendarWidget from "../components/CalendarWidget";
import { format, isSameDay } from "date-fns";
import { generateGoogleCalendarUrl } from "../utils/calendarUtils";

const StatCard = ({ label, value, hint }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-3 text-3xl font-extrabold text-emerald-600">{value}</p>
    <p className="mt-2 text-sm text-gray-400">{hint}</p>
  </div>
);

const NavItem = ({ active = false, children, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
      active
        ? "bg-emerald-700 text-white shadow-sm"
        : "text-emerald-50 hover:bg-emerald-700/80"
    }`}
  >
    {children}
  </button>
);

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [practitionerProfiles, setPractitionerProfiles] = useState({});

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

  useEffect(() => {
    const loadPractitionerProfiles = async () => {
      const sessionHistory = userData?.sessionHistory || [];
      const practitionerUserIds = Array.from(
        new Set(sessionHistory.map((s) => s?.practitioner?.id).filter(Boolean))
      );

      const missing = practitionerUserIds.filter(
        (id) => practitionerProfiles[id] === undefined
      );
      if (missing.length === 0) return;

      try {
        const results = await Promise.all(
          missing.map(async (id) => {
            try {
              const res = await getPractitionerProfileByUserId(id);
              return [id, res.data];
            } catch (e) {
              return [id, null];
            }
          })
        );

        setPractitionerProfiles((prev) => {
          const next = { ...prev };
          for (const [id, profile] of results) {
            next[id] = profile;
          }
          return next;
        });
      } catch (e) {
        // ignore
      }
    };

    if (userData) loadPractitionerProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const name = userData?.userProfile?.name || "User";
  const sessionHistory = userData?.sessionHistory || [];
  const upcomingSessions = sessionHistory.filter(
    (s) => s.status === "booked" && new Date(s.date) > new Date()
  );
  const upcomingCount = upcomingSessions.length;
  const productOrders = userData?.productOrders?.length || 0;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sessionsOnDate = sessionHistory.filter((s) =>
    isSameDay(new Date(s.date), calendarDate)
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-base font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 flex-col bg-emerald-900 px-5 py-6 text-white lg:flex">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">WellnessHub</h2>
            <p className="mt-1 text-sm text-emerald-100/80">
              Patient dashboard
            </p>
          </div>

          <nav className="mt-8 space-y-2">
            <NavItem active>Dashboard</NavItem>
            <NavItem onClick={() => navigate("/practitioners")}>
              Browse Practitioners
            </NavItem>
            <NavItem onClick={() => navigate("/my-sessions")}>
              My Sessions
            </NavItem>
            <NavItem onClick={() => navigate("/products")}>
              Wellness Products
            </NavItem>
            <NavItem onClick={() => navigate("/community")}>
              Community Q&amp;A
            </NavItem>
            <NavItem onClick={() => navigate("/my-orders")}>My Orders</NavItem>
            <NavItem onClick={() => navigate("/wishlist")}>Wishlist</NavItem>
            <NavItem>Profile</NavItem>
          </nav>

          <div className="mt-auto rounded-2xl bg-emerald-800/80 p-4">
            <p className="text-sm text-emerald-100">
              Logged in as
            </p>
            <p className="mt-1 text-base font-semibold text-white">{name}</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Top header */}
          <div className="mb-8 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 px-6 py-8 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">
              Dashboard Overview
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Hello, {name} 👋
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50 sm:text-base">
              Track your sessions, reminders, orders, and overall wellness journey
              from one place.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <StatCard
              label="Upcoming Sessions"
              value={upcomingCount}
              hint={
                upcomingCount === 0
                  ? "No sessions booked yet"
                  : `${upcomingCount} upcoming`
              }
            />
            <StatCard
              label="Total Sessions"
              value={sessionHistory.length}
              hint="All time"
            />
            <StatCard
              label="Orders"
              value={productOrders}
              hint={
                productOrders === 0 ? "No purchases yet" : `${productOrders} orders`
              }
            />
          </div>

          {/* Main two-column content */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
            {/* Calendar */}
            <div className="xl:col-span-2 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">
                My Session Calendar
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Select a date to view your scheduled sessions.
              </p>

              <div className="mt-5">
                <CalendarWidget
                  onDateSelect={setCalendarDate}
                  selectedDate={calendarDate}
                />
              </div>

              {sessionsOnDate.length > 0 ? (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {format(calendarDate, "MMM d")} — {sessionsOnDate.length} session
                    {sessionsOnDate.length !== 1 ? "s" : ""}
                  </p>

                  {sessionsOnDate.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
                    >
                      <p className="text-sm font-bold text-emerald-900">
                        Dr. {s.practitioner?.name}
                      </p>
                      {(() => {
                        const profile = practitionerProfiles[s?.practitioner?.id];
                        if (!profile) return null;
                        const parts = [];
                        if (profile.specialization) parts.push(profile.specialization);
                        if (profile.experienceYears != null)
                          parts.push(`${profile.experienceYears} yrs exp`);
                        if (parts.length === 0) return null;
                        return (
                          <p className="mt-1 text-xs text-emerald-700">
                            {parts.join(" · ")}
                          </p>
                        );
                      })()}
                      <p className="mt-1 text-sm text-emerald-700">
                        {format(new Date(s.date), "hh:mm a")}
                      </p>

                      <div className="mt-3 flex gap-4">
                        <button
                          onClick={() => navigate(`/sessions/${s.id}`)}
                          className="text-sm font-semibold text-emerald-700 hover:underline"
                        >
                          View
                        </button>
                        {s.status === "booked" && (
                          <a
                            href={generateGoogleCalendarUrl(s)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-indigo-600 hover:underline"
                          >
                            + Calendar
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-center text-sm text-gray-400">
                  No sessions on {format(calendarDate, "MMMM d")}
                </p>
              )}
            </div>

            {/* Upcoming sessions */}
            <div className="xl:col-span-3 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Upcoming Sessions &amp; Reminders
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Stay updated with your next scheduled sessions.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/my-sessions")}
                  className="text-sm font-semibold text-emerald-600 hover:underline"
                >
                  View all
                </button>
              </div>

              {upcomingSessions.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {upcomingSessions.slice(0, 5).map((session) => {
                    const sessionDate = new Date(session.date);
                    const msUntil = sessionDate - new Date();
                    const hoursUntil = msUntil / (1000 * 60 * 60);
                    const isSoon = hoursUntil > 0 && hoursUntil <= 24;
                    const isVeryClose = hoursUntil > 0 && hoursUntil <= 1;

                    return (
                      <div
                        key={session.id}
                        className={`px-6 py-5 transition hover:bg-gray-50 ${
                          isSoon ? "border-l-4 border-amber-400" : ""
                        }`}
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="flex items-start gap-4">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold ${
                                isSoon
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {session.practitioner?.name?.charAt(0)}
                            </div>

                            <div>
                              <p className="text-base font-bold text-gray-900">
                                Dr. {session.practitioner?.name}
                              </p>

                              {(() => {
                                const profile =
                                  practitionerProfiles[session?.practitioner?.id];
                                if (!profile) return null;
                                const parts = [];
                                if (profile.specialization)
                                  parts.push(profile.specialization);
                                if (profile.experienceYears != null)
                                  parts.push(`${profile.experienceYears} yrs exp`);
                                if (parts.length === 0) return null;
                                return (
                                  <p className="mt-1 text-sm text-emerald-700">
                                    {parts.join(" · ")}
                                  </p>
                                );
                              })()}

                              <p className="mt-1 text-sm text-gray-500">
                                {format(
                                  new Date(session.date),
                                  "MMM d, yyyy · hh:mm a"
                                )}
                              </p>

                              {session.notes && (
                                <p className="mt-2 text-sm italic text-gray-500">
                                  &ldquo;{session.notes}&rdquo;
                                </p>
                              )}

                              {isSoon && (
                                <div className="mt-3 flex flex-wrap items-center gap-3">
                                  <p className="text-sm font-medium text-amber-700">
                                    {isVeryClose
                                      ? "Starting in less than 1 hour!"
                                      : `Starting in ${Math.round(hoursUntil)} hours`}
                                  </p>
                                  <a
                                    href={generateGoogleCalendarUrl(session)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-semibold text-indigo-600 hover:underline"
                                  >
                                    + Add to Calendar
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {isVeryClose && (
                              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 animate-pulse">
                                NOW
                              </span>
                            )}
                            {isSoon && !isVeryClose && (
                              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                                SOON
                              </span>
                            )}
                            <button
                              onClick={() => navigate(`/sessions/${session.id}`)}
                              className="text-sm font-semibold text-emerald-600 hover:underline"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-6 py-14 text-center">
                  <p className="text-base text-gray-500">No upcoming sessions.</p>
                  <button
                    onClick={() => navigate("/practitioners")}
                    className="mt-4 text-sm font-semibold text-emerald-600 hover:underline"
                  >
                    Book your first session →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom cards */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">
                Find a Practitioner
              </h2>
              <p className="mt-2 text-sm leading-7 text-gray-500">
                Browse verified therapists and book a session based on your needs.
              </p>
              <button
                onClick={() => navigate("/practitioners")}
                className="mt-6 w-full rounded-2xl bg-emerald-600 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-700"
              >
                Browse Practitioners
              </button>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
              <p className="mt-2 text-sm text-gray-500">
                Important updates related to your sessions and reminders.
              </p>

              {upcomingSessions.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {upcomingSessions.slice(0, 2).map((s) => {
                    const hrs =
                      (new Date(s.date) - new Date()) / (1000 * 60 * 60);
                    return (
                      <div
                        key={s.id}
                        className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4"
                      >
                        <div className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-500"></div>
                        <p className="text-sm font-medium text-blue-700">
                          Session with Dr. {s.practitioner?.name} on{" "}
                          {format(new Date(s.date), "MMM d")}
                          {hrs < 24 && hrs > 0 && " — starting soon!"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-5 text-sm text-gray-500">
                  No new notifications.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;