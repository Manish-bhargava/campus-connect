import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; // Assuming this path is correct
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants"; // Assuming this path is correct

// A helper component for styled inputs
const Input = ({ label, type = "text", value, onChange }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      required
    />
  </div>
);

const LoginPage = () => {
  // Your existing state
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  
  // Your existing hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Your existing login/signup handlers
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
      return navigate("/profile"); // Redirect to profile on new signup
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // Helper to prevent form submission from refreshing the page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-inter flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              TechBuddy
            </span>
          </h1>
          <h2 className="text-2xl font-semibold text-white">
            {isLoginForm ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="text-gray-400">
            {isLoginForm
              ? "Login to find your match."
              : "Sign up to start connecting."}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50">
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
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full group relative inline-flex items-center justify-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30"
              >
                {isLoginForm ? "Login" : "Create Account"}
              </button>
            </div>
          </form>

          {/* Toggle Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {isLoginForm ? "New to TechBuddy? " : "Already have an account? "}
              <span
                onClick={() => {
                  setIsLoginForm((value) => !value);
                  setError(""); // Clear error on toggle
                }}
                className="font-semibold text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
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