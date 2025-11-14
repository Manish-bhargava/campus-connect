import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {BASE_URL} from "../utils/constants";
import axios from "axios";
import { useNavigate } from 'react-router-dom';




const addUser = (user) => ({ type: 'user/addUser', payload: user });

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
    />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="4"
      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
    />
  </div>
);

// --- Live Preview Card ---

const UserCard = ({ user }) => (
  <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden sticky top-24">
    <div className="p-8">
      <img
        src={user.photoUrl || `https://placehold.co/400x400/1f2937/9ca3af?text=${user.firstName.charAt(0)}`}
        alt="Profile Preview"
        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-700 shadow-lg"
        onError={(e) => { e.target.src = `https://placehold.co/400x400/1f2937/9ca3af?text=${user.firstName.charAt(0)}`; e.target.onerror = null; }}
      />
      <h3 className="text-3xl font-bold text-white text-center mb-2">
        {user.firstName || "Your"} {user.lastName || "Name"}
      </h3>
      
      {(user.age || user.gender) && (
        <p className="text-center text-blue-400 text-sm mb-6">
          {user.age && `${user.age} years old`}
          {user.age && user.gender && ` · `}
          {user.gender}
        </p>
      )}

      {user.about && (
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">About Me</h4>
          <p className="text-gray-300 whitespace-pre-wrap break-words">
            {user.about}
          </p>
        </div>
      )}
      {!user.about && (
        <p className="text-center text-gray-500 italic">
          Your "About" section will appear here.
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
  // Your original state
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
 const navigate = useNavigate();

  // Your original save function
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "An error occurred");
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile();
    navigate('/feed');
  };

  // Create a live user object for the preview card
  const liveUserPreview = { firstName, lastName, photoUrl, age, gender, about };

  return (
    <>
      <Toast message="Profile saved successfully." show={showToast} />
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Edit Your Profile
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Edit Form */}
          <div className="lg:col-span-2 bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

              <Input
                label="Photo URL"
                value={photoUrl}
                onChange={setPhotoUrl}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Age"
                  type="number"
                  value={age}
                  onChange={setAge}
                />
                <Input
                  label="Gender"
                  value={gender}
                  onChange={setGender}
                />
              </div>

              <TextArea
                label="About"
                value={about}
                onChange={setAbout}
              />
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30"
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