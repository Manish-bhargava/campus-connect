import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

// Redux Action
const addUser = (user) => ({ type: "user/addUser", payload: user });

/* ---------- Reusable Inputs ---------- */
const Input = ({ label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      rows="4"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition"
    />
  </div>
);

/* ---------- Live Preview Card ---------- */
const UserCard = ({ user }) => {
  const fallback = `https://placehold.co/300x300?text=${user.firstName?.charAt(0) || "U"}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center sticky top-24">
      <img
        src={user.photoUrl || fallback}
        onError={(e) => (e.target.src = fallback)}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
        alt="Profile"
      />
      <h3 className="text-xl font-bold text-gray-800">
        {user.firstName || "Your"} {user.lastName || "Name"}
      </h3>
      {user.headline && (
        <p className="text-pink-500 text-sm font-medium mt-1 mb-3">
          {user.headline}
        </p>
      )}
      <p className="text-gray-600 text-sm leading-relaxed">
        {user.bio || "Your bio appears here..."}
      </p>
    </div>
  );
};

/* ---------- MAIN COMPONENT ---------- */
const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    bio: "",
    headline: "",
    photoUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  /* 1. LOAD DATA: 
     Unpack the nested 'profile' object from Redux into our flat form state.
  */
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "",
        // Unpack nested fields safely
        bio: user.profile?.bio || "",         
        headline: user.profile?.headline || "",
        photoUrl: user.photoUrl || "",
      });
    }
  }, [user]);

  /* 2. PHOTO UPLOAD: 
     Uploads immediately and updates preview.
  */
  const handlePhotoUpload = async (file) => {
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("photo", file);

    try {
      setUploading(true);
      const res = await axios.patch(
        `${BASE_URL}/profile/photo`,
        uploadData,
        { withCredentials: true }
      );

      // Update state immediately
      setFormData((prev) => ({ ...prev, photoUrl: res.data.data.photoUrl }));
      // Update Redux
      dispatch(addUser(res.data.data));
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* 3. SAVE SUBMISSION (THE FIX):
     We merge existing profile data so 'location' isn't lost.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Construct Payload
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      gender: formData.gender,
      
      // FIX IS HERE: Preserve existing nested data (like location)
      profile: {
        ...(user?.profile || {}), // Keeps location, website, etc.
        bio: formData.bio,        // Overwrite bio
        headline: formData.headline, // Overwrite headline
      },
    };

    // Clean Photo URL: Remove if empty to avoid validation errors
    if (formData.photoUrl && formData.photoUrl.trim() !== "") {
      payload.photoUrl = formData.photoUrl;
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        payload, 
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (err) {
      console.error("Save Error:", err.response?.data);
      setError(err?.response?.data?.message || "Failed to save profile. Check console.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 px-4">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
        </div>
           
        {/* Photo Upload Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Profile Photo
          </label>
          <div className="flex items-center gap-6">
            <img
              src={
                formData.photoUrl ||
                `https://placehold.co/100x100?text=${formData.firstName?.charAt(0) || "U"}`
              }
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
              alt="preview"
            />
            <div>
              <label className="cursor-pointer bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition shadow-sm inline-block">
                {uploading ? "Uploading..." : "Change Photo"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handlePhotoUpload(e.target.files[0])}
                  disabled={uploading}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Accepted formats: JPG, PNG. Max size: 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="First Name" 
            value={formData.firstName} 
            onChange={(v) => setFormData({ ...formData, firstName: v })} 
          />
          <Input 
            label="Last Name" 
            value={formData.lastName} 
            onChange={(v) => setFormData({ ...formData, lastName: v })} 
          />
          <Input 
            label="Age" 
            type="number" 
            value={formData.age} 
            onChange={(v) => setFormData({ ...formData, age: v })} 
          />
          <Input 
            label="Gender" 
            value={formData.gender} 
            onChange={(v) => setFormData({ ...formData, gender: v })} 
            placeholder="male / female / other"
          />
        </div>

        <Input
          label="Headline"
          value={formData.headline}
          onChange={(v) => setFormData({ ...formData, headline: v })}
          placeholder="e.g. Full Stack Developer at TechBuddy"
        />

        <TextArea
          label="Bio"
          value={formData.bio}
          onChange={(v) => setFormData({ ...formData, bio: v })}
          placeholder="Tell the community about yourself..."
        />

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        <div className="flex gap-4 pt-4 border-t mt-4">
          <button
            type="button"
            onClick={() => navigate("/feed")}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-2.5 rounded-lg hover:opacity-90 transition shadow-md"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* PREVIEW CARD */}
      <div className="hidden lg:block">
         <UserCard user={formData} />
         <p className="text-center text-gray-400 text-xs mt-4">Live Preview</p>
      </div>
    </div>
  );
};

export default EditProfile;