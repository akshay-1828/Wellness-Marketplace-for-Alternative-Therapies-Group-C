import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PractitionerProfile from "./pages/PractitionerProfile";
import PatientDashboard from "./pages/PatientDashboard";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import PractitionerListing from './pages/PractitionerListing';
import BookingPage from './pages/BookingPage';
import AvailabilityPage from './pages/AvailabilityPage';
import MySessions from './pages/MySessions';
import SessionDetail from './pages/SessionDetail';
import OAuth2CallbackPage from './pages/OAuth2CallbackPage';
import ProductPage from "./pages/ProductPage";   // ✅ ADDED
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Protected Routes */}

                <Route
                    path="/patient-dashboard"
                    element={
                        <ProtectedRoute requiredRole="PATIENT">
                            <PatientDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* ✅ PRODUCTS ROUTE */}
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute requiredRole="PATIENT">
                            <ProductPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/practitioner-dashboard"
                    element={
                        <ProtectedRoute requiredRole="PRACTITIONER">
                            <PractitionerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/practitioner-profile"
                    element={
                        <ProtectedRoute requiredRole="PRACTITIONER">
                            <PractitionerProfile />
                        </ProtectedRoute>
                    }
                />

                <Route path="/practitioners" element={<PractitionerListing />} />
                <Route path="/book/:id" element={<BookingPage />} />
                <Route path="/my-sessions" element={<MySessions />} />

                <Route
                    path="/availability"
                    element={
                        <ProtectedRoute requiredRole="PRACTITIONER">
                            <AvailabilityPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sessions/:id"
                    element={
                        <ProtectedRoute>
                            <SessionDetail />
                        </ProtectedRoute>
                    }
                />

                <Route path="/oauth2callback" element={<OAuth2CallbackPage />} />

                {/* Default Routes */}
                <Route path="/" element={<Home />} />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </Router>
    );
}

export default App;