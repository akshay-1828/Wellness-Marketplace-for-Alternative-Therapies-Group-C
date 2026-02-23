import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { createPractitionerProfile } from "../services/practitionerService";

const PractitionerProfile = () => {
  const [formData, setFormData] = useState({
    specialization: "",
    licenseNumber: "",
    experience: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError("");
    setIsLoading(true);

    try {
      const profilePayload = {
        licenseNumber: formData.licenseNumber,
        specialization: formData.specialization,
      };

      await createPractitionerProfile(profilePayload);

      alert("Profile submitted successfully!");
      // Navigate to practitioner dashboard
      window.location.href = "/practitioner-dashboard";
    } catch (error) {
      console.error("Profile submission error:", error);
      setApiError(
        error?.response?.data?.message ||
          error.message ||
          "Unable to submit profile."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Complete Your Profile"
      subtitle="Add your professional details to get verified"
    >
      <form onSubmit={handleSubmit} noValidate>
        
        {/* API Error */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{apiError}</p>
          </div>
        )}

        {/* Specialization */}
        <InputField
          label="Specialization"
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="e.g., Physiotherapy"
          required
        />

        {/* License Number */}
        <InputField
          label="License Number"
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          placeholder="Enter your license number"
          required
        />

        {/* Experience (UI Only for Now) */}
        <InputField
          label="Years of Experience"
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="e.g., 5"
        />

        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default PractitionerProfile;
