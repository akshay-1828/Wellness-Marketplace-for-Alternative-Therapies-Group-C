import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import Button from "../components/Button";

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password.trim()) {
            setError("Password is required");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8084/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token,
                    newPassword: password
                })
            });

            if (!response.ok) {
                throw new Error("Invalid token");
            }

            alert("Password reset successful");

            navigate("/");

        } catch (err) {
            setError("Invalid or expired reset link");
        }

        setIsLoading(false);
    };

    return (
        <AuthCard
            title="Create New Password"
            subtitle="Enter a new password for your account"
        >
            <form onSubmit={handleSubmit}>

                <InputField
                    label="New Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error}
                    required
                />

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    loading={isLoading}
                >
                    {isLoading ? "Resetting..." : "Reset Password"}
                </Button>

            </form>
        </AuthCard>
    );
};

export default ResetPassword;