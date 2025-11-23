import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

// A helper component for styled inputs
const Input = ({ label, type = "text", value, onChange }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
      required
    />
  </div>
);

const LoginPage = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 text-gray-800 font-inter flex items-center justify-center p-4 selection:bg-pink-400 selection:text-white">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
              TechBuddy
            </span>
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">
            {isLoginForm ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="text-gray-600">
            {isLoginForm
              ? "Login to find your match."
              : "Sign up to start connecting."}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Conditional Sign Up Fields */}
            {!isLoginForm && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                />
                <Input
                  label="Last Name"
                  value={lastName}
                  onChange={setLastName}
                />
              </div>
            )}

            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              value={emailId}
              onChange={setEmailId}
            />

            {/* Password Field */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isLoginForm ? "Login" : "Create Account"}
              </button>
            </div>
          </form>

          {/* Toggle Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLoginForm ? "New to TechBuddy? " : "Already have an account? "}
              <span
                onClick={() => {
                  setIsLoginForm((value) => !value);
                  setError("");
                }}
                className="font-semibold text-pink-500 hover:text-pink-600 cursor-pointer transition-colors"
              >
                {isLoginForm ? "Create an account" : "Log in here"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;