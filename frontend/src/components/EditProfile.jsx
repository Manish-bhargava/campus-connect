import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const addUser = (user) => ({ type: 'user/addUser', payload: user });

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
    />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="4"
      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// --- Live Preview Card ---
const UserCard = ({ user }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 overflow-hidden sticky top-24">
    <div className="p-8">
      <img
        src={user.photoUrl || `https://placehold.co/400x400/f3f4f6/6b7280?text=${user.firstName?.charAt(0) || 'U'}`}
        alt="Profile Preview"
        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-200 shadow-lg"
        onError={(e) => { e.target.src = `https://placehold.co/400x400/f3f4f6/6b7280?text=${user.firstName?.charAt(0) || 'U'}`; e.target.onerror = null; }}
      />
      <h3 className="text-3xl font-bold text-gray-900 text-center mb-2">
        {user.firstName || "Your"} {user.lastName || "Name"}
      </h3>
      
      {user.headline && (
        <p className="text-center text-pink-500 text-lg font-medium mb-4">
          {user.headline}
        </p>
      )}
      
      {(user.age || user.gender) && (
        <p className="text-center text-gray-600 text-sm mb-4">
          {user.age && `${user.age} years old`}
          {user.age && user.gender && ` · `}
          {user.gender}
        </p>
      )}

      {user.bio && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">About Me</h4>
          <p className="text-gray-700 whitespace-pre-wrap break-words">
            {user.bio}
          </p>
        </div>
      )}

      {!user.bio && !user.about && (
        <p className="text-center text-gray-400 italic">
          Your profile information will appear here.
        </p>
      )}
    </div>
  </div>
);

// --- Custom Toast Notification ---
const Toast = ({ message, show }) => (
  <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
    <div className="bg-green-500/90 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-lg shadow-lg border border-green-400/50">
      {message}
    </div>
  </div>
);

// --- Edit Profile Component ---
const EditProfile = ({ user }) => {
  // Only use fields that exist in your current user model
  const [formData, setFormData] = useState({
    // Basic Info (existing fields)
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    photoUrl: user.photoUrl || "",
    age: user.age || "",
    gender: user.gender || "",
    about: user.about || "",
    
    // New optional fields (send as flat fields, not nested)
    headline: user.headline || "",
    bio: user.bio || "",
    website: user.website || "",
    github: user.github || "",
    linkedin: user.linkedin || "",
    portfolio: user.portfolio || "",
    currentRole: user.currentRole || "",
    experienceLevel: user.experienceLevel || "",
    availability: user.availability || "flexible",
  });

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = async () => {
    setError("");
    try {
      // Only send fields that have values to avoid nested object issues
      const payload = Object.keys(formData).reduce((acc, key) => {
        if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {
          acc[key] = formData[key];
        }
        return acc;
      }, {});

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        payload,
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "An error occurred");
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile();
  };

  const experienceLevels = [
    { value: "student", label: "Student" },
    { value: "junior", label: "Junior Developer" },
    { value: "mid-level", label: "Mid-Level Developer" },
    { value: "senior", label: "Senior Developer" },
    { value: "lead", label: "Tech Lead" },
    { value: "principal", label: "Principal Engineer" },
  ];

  const availabilityOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "weekends", label: "Weekends" },
    { value: "evenings", label: "Evenings" },
    { value: "flexible", label: "Flexible" },
  ];

  const liveUserPreview = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    photoUrl: formData.photoUrl,
    age: formData.age,
    gender: formData.gender,
    about: formData.about,
    headline: formData.headline,
    bio: formData.bio,
  };

  return (
    <>
      <Toast message="Profile saved successfully!" show={showToast} />
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Your Profile</h1>
        <p className="text-gray-600 mb-8">Complete your profile to get better matches</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Edit Form */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(value) => handleInputChange('firstName', value)}
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(value) => handleInputChange('lastName', value)}
                  />
                </div>

                <Input
                  label="Photo URL"
                  value={formData.photoUrl}
                  onChange={(value) => handleInputChange('photoUrl', value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(value) => handleInputChange('age', value)}
                  />
                  <Input
                    label="Gender"
                    value={formData.gender}
                    onChange={(value) => handleInputChange('gender', value)}
                  />
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Professional Information</h3>
                
                <Input
                  label="Professional Headline"
                  value={formData.headline}
                  onChange={(value) => handleInputChange('headline', value)}
                  placeholder="e.g. Full Stack Developer"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Select
                    label="Experience Level"
                    value={formData.experienceLevel}
                    onChange={(value) => handleInputChange('experienceLevel', value)}
                    options={experienceLevels}
                  />
                  <Select
                    label="Availability"
                    value={formData.availability}
                    onChange={(value) => handleInputChange('availability', value)}
                    options={availabilityOptions}
                  />
                </div>

                <Input
                  label="Current Role"
                    value={formData.currentRole}
                    onChange={(value) => handleInputChange('currentRole', value)}
                    placeholder="e.g. Software Engineer at Tech Company"
                />
              </div>

              {/* About & Links Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">About & Links</h3>
                
                <TextArea
                  label="Bio"
                  value={formData.bio}
                  onChange={(value) => handleInputChange('bio', value)}
                  placeholder="Tell us about yourself, your interests, and what you're looking for..."
                />

                <TextArea
                  label="About"
                  value={formData.about}
                  onChange={(value) => handleInputChange('about', value)}
                  placeholder="More about you..."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="GitHub URL"
                    value={formData.github}
                    onChange={(value) => handleInputChange('github', value)}
                    placeholder="https://github.com/username"
                  />
                  <Input
                    label="LinkedIn URL"
                    value={formData.linkedin}
                    onChange={(value) => handleInputChange('linkedin', value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <Input
                  label="Portfolio Website"
                  value={formData.portfolio}
                  onChange={(value) => handleInputChange('portfolio', value)}
                  placeholder="https://yourportfolio.com"
                />
              </div>
              
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/feed')}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Live Preview Card */}
          <div className="lg:col-span-1">
            <UserCard user={liveUserPreview} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;