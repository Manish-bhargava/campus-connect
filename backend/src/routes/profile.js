const express = require("express");
const profileRouter = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary"); // Keep your existing config
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const streamifier = require("streamifier"); // You might need to install this: npm install streamifier


const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ---------------------------------------------------------
// HELPER: STREAM UPLOAD TO CLOUDINARY
// ---------------------------------------------------------
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "profile_photos", // <--- EXPLICITLY SET HERE. NO "./"
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// ---------------------------------------------------------
// GET: View Profile
// ---------------------------------------------------------
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const data = user.getPublicProfile ? user.getPublicProfile() : user;
    res.json({ success: true, data: data });
  } catch (err) {
    res.status(400).json({ success: false, message: "ERROR: " + err.message });
  }
});

// ---------------------------------------------------------
// PATCH: Upload Profile Photo (MANUAL UPLOAD)
// ---------------------------------------------------------
profileRouter.patch("/profile/photo", userAuth, upload.single("photo"), async (req, res) => {
  console.log("📸 /profile/photo HIT - Using Manual Stream Upload");

  try {
    // 1. Check if file exists in memory
    if (!req.file) {
      throw new Error("No file uploaded. Please select an image.");
    }

    // 2. Upload to Cloudinary manually
    console.log("☁️ Uploading to Cloudinary...");
    const result = await uploadToCloudinary(req.file.buffer);
    
    console.log("✅ Cloudinary Success! URL:", result.secure_url);

    // 3. Save to Database
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { photoUrl: result.secure_url } },
      { new: true, runValidators: false }
    );

    res.json({
      success: true,
      message: "Profile photo updated successfully",
      data: { photoUrl: updatedUser.photoUrl },
    });

  } catch (err) {
    console.error("❌ UPLOAD/DB ERROR:", err);
    res.status(500).json({ 
      success: false, 
      message: "Upload Failed: " + (err.message || "Unknown error") 
    });
  }
});

// ---------------------------------------------------------
// PATCH: Edit Profile
// ---------------------------------------------------------
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) throw new Error("Invalid Edit Request");
    const loggedInUser = req.user;
    const updates = req.body;

    const rootFields = ["firstName", "lastName", "age", "gender", "about"];
    rootFields.forEach((field) => {
      if (updates[field] !== undefined) loggedInUser[field] = updates[field];
    });

    if (updates.profile) {
      if (!loggedInUser.profile) loggedInUser.profile = {};
      if (updates.profile.bio !== undefined) loggedInUser.profile.bio = updates.profile.bio;
      if (updates.profile.headline !== undefined) loggedInUser.profile.headline = updates.profile.headline;
      if (updates.profile.location) loggedInUser.profile.location = updates.profile.location;
      
      if (updates.profile.linkedin !== undefined) loggedInUser.profile.linkedin = updates.profile.linkedin;
      if (updates.profile.github !== undefined) loggedInUser.profile.github = updates.profile.github;
      if (updates.profile.website !== undefined) loggedInUser.profile.website = updates.profile.website;
    }

    const otherSections = ["technicalSkills", "professionalInfo", "projectInterests", "matchingPreferences", "privacySettings"];
    otherSections.forEach((section) => {
      if (updates[section] !== undefined) loggedInUser[section] = updates[section];
    });

    if (loggedInUser.calculateProfileCompletion) loggedInUser.calculateProfileCompletion();
    
    await loggedInUser.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: loggedInUser.getPublicProfile ? loggedInUser.getPublicProfile() : loggedInUser,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "ERROR: " + err.message });
  }
});

module.exports = profileRouter;