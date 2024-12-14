// src/screens/Registerscreen.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registerscreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (formData.password !== formData.cpassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess("OTP sent to your email");
      setShowOTP(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {loading && <p className="text-center">Loading...</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <h2 className="text-3xl font-bold text-center mb-6">
          {showOTP ? "Verify OTP" : "Register"}
        </h2>

        {!showOTP ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.cpassword}
              onChange={(e) => setFormData({...formData, cpassword: e.target.value})}
              required
            />
            <button
              onClick={handleRegister}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-3 py-2 border rounded-md"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "VERIFYING..." : "VERIFY OTP"}
            </button>
          </div>
        )}

        <div className="text-center mt-4">
          <a href="/login" className="text-blue-500 hover:text-blue-600">
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Registerscreen;