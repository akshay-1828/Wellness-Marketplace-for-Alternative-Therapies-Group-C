// import React from "react";
// import { Link } from "react-router-dom";

// const FancyBackground = ({ children }) => {
//   return (
//     <div className="relative w-full overflow-hidden">

//       {/* Background Layer */}
//       <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">

//         {/* Floating Blobs */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

//         {/* SVG Plus Pattern */}
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         ></div>
//       </div>

//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// };

// const Home = () => {
//   return (
//     <div className="flex flex-col">

//       {/* HERO SECTION */}
//       <FancyBackground>
//         <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20 text-white">
//           <h1 className="text-5xl font-bold mb-6">
//             WellnessHub
//           </h1>

//           <p className="text-lg max-w-2xl mb-8 text-emerald-200">
//             A marketplace connecting patients with certified alternative therapy practitioners.
//             Book sessions, manage appointments, and experience holistic wellness.
//           </p>

//           <div className="flex gap-6">
//             <Link
//               to="/login"
//               className="bg-white text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
//             >
//               Login
//             </Link>

//             <Link
//               to="/register"
//               className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-800 transition"
//             >
//               Get Started
//             </Link>
//           </div>
//         </section>
//       </FancyBackground>


//       {/* FEATURES SECTION */}
//       <section className="bg-white text-gray-800 py-20 px-8">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

//           <div>
//             <h3 className="text-xl font-semibold mb-3">
//               🧘 Discover Therapies
//             </h3>
//             <p className="text-gray-600">
//               Explore a range of wellness therapies and supportive care.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3">
//               👩‍⚕️ Verified Practitioners
//             </h3>
//             <p className="text-gray-600">
//               Connect with certified and verified professionals for safe and trusted care.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-3">
//               📅 Easy Booking
//             </h3>
//             <p className="text-gray-600">
//               Book appointments and manage your sessions seamlessly in one place.
//             </p>
//           </div>

//         </div>
//       </section>


//       {/* ROLE SECTION (THIS WAS MISSING) */}
//       <section className="bg-gray-100 py-20 px-8">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

//           <div className="bg-white p-8 rounded-xl shadow">
//             <h3 className="text-2xl font-bold mb-4 text-emerald-700">
//               For Patients
//             </h3>
//             <ul className="space-y-3 text-gray-600">
//               <li>✔ Browse therapies</li>
//               <li>✔ Book sessions</li>
//               <li>✔ Manage appointments</li>
//               <li>✔ Track wellness journey</li>
//             </ul>
//           </div>

//           <div className="bg-white p-8 rounded-xl shadow">
//             <h3 className="text-2xl font-bold mb-4 text-blue-700">
//               For Practitioners
//             </h3>
//             <ul className="space-y-3 text-gray-600">
//               <li>✔ Create professional profile</li>
//               <li>✔ Manage patient appointments</li>
//               <li>✔ View performance insights</li>
//               <li>✔ Grow your practice</li>
//             </ul>
//           </div>

//         </div>
//       </section>


//       {/* FOOTER */}
//       <FancyBackground>
//         <footer className="text-center text-emerald-200 text-sm py-8">
//           © 2026 WellnessHub. All rights reserved.
//         </footer>
//       </FancyBackground>

//     </div>
//   );
// };

// export default Home;


import React from "react";
import { Link } from "react-router-dom";

const FancyBackground = ({ children }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
        <div className="absolute top-16 left-8 h-72 w-72 rounded-full bg-emerald-400 opacity-20 blur-3xl"></div>
        <div className="absolute right-10 top-32 h-80 w-80 rounded-full bg-cyan-400 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-400 opacity-20 blur-3xl"></div>

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Ccircle cx='30' cy='30' r='1.6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className="mb-4 text-3xl">{icon}</div>
    <h3 className="mb-3 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-sm leading-7 text-gray-600">{text}</p>
  </div>
);

const RoleCard = ({ title, titleColor, items }) => (
  <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
    <h3 className={`mb-5 text-2xl font-bold ${titleColor}`}>{title}</h3>
    <ul className="space-y-3 text-gray-700">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 text-emerald-600">✔</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col bg-gray-50">
      <FancyBackground>
        <section className="flex min-h-[78vh] items-center justify-center px-6 py-16 text-white">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-emerald-100 backdrop-blur">
                Holistic care made simpler
              </div>

              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                WellnessHub
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-100 sm:text-lg">
                A modern wellness marketplace connecting patients with certified
                alternative therapy practitioners. Discover therapies, book
                sessions, and manage your wellness journey with ease.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to="/login"
                  className="rounded-xl bg-white px-7 py-3 text-base font-semibold text-emerald-800 shadow-md transition hover:bg-emerald-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl border border-white/70 px-7 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-emerald-800"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/90 p-5 text-left text-gray-800">
                    <p className="text-sm font-medium text-gray-500">Patients</p>
                    <p className="mt-2 text-2xl font-bold">Easy Booking</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Browse therapies, book sessions, and manage appointments.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/90 p-5 text-left text-gray-800">
                    <p className="text-sm font-medium text-gray-500">Practitioners</p>
                    <p className="mt-2 text-2xl font-bold">Verified Profiles</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Build trust with professional details and availability.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/90 p-5 text-left text-gray-800 sm:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Wellness Journey</p>
                    <p className="mt-2 text-2xl font-bold">Everything in one place</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Sessions, reminders, products, orders, and community support
                      together in a single platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FancyBackground>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why choose WellnessHub?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Designed to make wellness discovery, consultation, and follow-up
              simpler for both patients and practitioners.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon="🧘"
              title="Discover Therapies"
              text="Explore a range of alternative therapies and supportive wellness solutions."
            />
            <FeatureCard
              icon="👩‍⚕️"
              title="Verified Practitioners"
              text="Connect with trusted professionals for safe, reliable, and guided care."
            />
            <FeatureCard
              icon="📅"
              title="Easy Booking"
              text="Schedule sessions, track appointments, and manage everything smoothly."
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Built for everyone</h2>
            <p className="mt-3 text-gray-600">
              Whether you are seeking care or offering it, WellnessHub supports your journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <RoleCard
              title="For Patients"
              titleColor="text-emerald-700"
              items={[
                "Browse therapies and wellness products",
                "Book sessions with verified practitioners",
                "Manage appointments and reminders",
                "Track your wellness journey with ease",
              ]}
            />

            <RoleCard
              title="For Practitioners"
              titleColor="text-cyan-700"
              items={[
                "Create and manage a professional profile",
                "Handle patient appointments efficiently",
                "Showcase services and wellness products",
                "Grow your practice with better visibility",
              ]}
            />
          </div>
        </div>
      </section>

      <FancyBackground>
        <footer className="px-6 py-8 text-center text-sm text-emerald-100">
          © 2026 WellnessHub. All rights reserved.
        </footer>
      </FancyBackground>
    </div>
  );
};

export default Home;