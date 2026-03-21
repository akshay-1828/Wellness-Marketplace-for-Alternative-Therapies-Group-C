// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import AuthCard from '../components/AuthCard';
// import InputField from '../components/InputField';
// import Button from '../components/Button';
// import { login, saveAuthData } from '../services/authService';

// // Mail Icon
// const MailIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//   </svg>
// );

// // Lock Icon
// const LockIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//   </svg>
// );

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }

//     if (apiError) {
//       setApiError('');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setApiError('');

//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       const response = await login(formData.email, formData.password);

//       if (response.accessToken) {
//         // Store tokens and role
//         saveAuthData(response);

//         // Role-based redirect
//         if (response.role === 'PRACTITIONER') {
//           navigate('/practitioner-dashboard');
//         } else {
//           navigate('/patient-dashboard');
//         }
//       }

//     } catch (error) {
//       console.error('Login error:', error);
//       setApiError(
//         error?.response?.data?.message ||
//         error.message ||
//         'Invalid email or password'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthCard
//       title="Welcome Back"
//       subtitle="Sign in to your wellness account"
//     >
//       <form onSubmit={handleSubmit} noValidate>

//         {apiError && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-sm text-red-600">{apiError}</p>
//           </div>
//         )}

//         <InputField
//           label="Email Address"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="name@example.com"
//           error={errors.email}
//           required
//           icon={MailIcon}
//         />

//         <InputField
//           label="Password"
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="••••••••"
//           error={errors.password}
//           required
//           icon={LockIcon}
//         />

//         <div className="flex justify-end mb-6">
//           <Link
//             to="/forgot-password"
//             className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         <Button
//           type="submit"
//           variant="primary"
//           disabled={isLoading}
//           loading={isLoading}
//         >
//           {isLoading ? 'Signing In...' : 'Sign In'}
//         </Button>

//         <div className="text-center mt-6">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link
//               to="/register"
//               className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
//             >
//               Create an account
//             </Link>
//           </p>
//         </div>

//       </form>
//     </AuthCard>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { login, saveAuthData } from "../services/authService";

// Mail Icon
const MailIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

// Lock Icon
const LockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await login(formData.email, formData.password);

      if (response.accessToken) {
        saveAuthData(response);

        if (response.role === "PRACTITIONER") {
          navigate("/practitioner-dashboard");
        } else {
          navigate("/patient-dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError(
        error?.response?.data?.message ||
          error.message ||
          "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to access your wellness dashboard, sessions, and appointments."
    >
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M5.121 17.804A9 9 0 1118.879 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500">
          Use your registered email and password to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-600">{apiError}</p>
          </div>
        )}

        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          error={errors.email}
          required
          icon={MailIcon}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
          required
          icon={LockIcon}
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
          >
            Forgot password?
          </Link>
        </div>

        <div className="pt-1">
          <Button type="submit" variant="primary" disabled={isLoading} loading={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </div>

        <div className="border-t border-gray-100 pt-5 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default Login;