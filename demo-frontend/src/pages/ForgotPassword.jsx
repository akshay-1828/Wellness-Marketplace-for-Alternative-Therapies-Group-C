import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import Button from '../components/Button';

const MailIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
);

const ArrowLeftIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
);

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {

      const response = await fetch(
          "http://localhost:8084/api/auth/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
          }
      );

      if (!response.ok) {
        throw new Error("Failed to send reset link");
      }

      setIsSubmitted(true);

    } catch (err) {
      setError("Unable to send reset email. Please try again.");
    }

    setIsLoading(false);
  };

  return (
      <AuthCard
          title="Reset Password"
          subtitle="Enter your email to receive reset instructions"
      >

        {!isSubmitted ? (

            <form onSubmit={handleSubmit} noValidate>

              <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  error={error}
                  required
                  icon={MailIcon}
              />

              <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  loading={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="mt-6 text-center">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-1" />
                  Back to Sign In
                </Link>
              </div>

            </form>

        ) : (

            <div className="text-center">

              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Check your email
              </h3>

              <p className="text-gray-600 text-sm mb-6">
                We've sent password reset instructions to <br />
                <span className="font-medium text-gray-800">{email}</span>
              </p>

              <Link to="/">
                <Button variant="secondary">
                  Back to Sign In
                </Button>
              </Link>

            </div>

        )}

      </AuthCard>
  );
};

export default ForgotPassword;