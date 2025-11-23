const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

// Get user profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      data: user.getPublicProfile ? user.getPublicProfile() : user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "ERROR: " + err.message
    });
  }
});

// Edit profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    // Handle nested fields properly
    const updateData = req.body;
    
    // Update basic fields
    Object.keys(updateData).forEach((key) => {
      if (key !== 'profile' && key !== 'technicalSkills' && key !== 'professionalInfo' && 
          key !== 'projectInterests' && key !== 'matchingPreferences' && key !== 'privacySettings') {
        loggedInUser[key] = updateData[key];
      }
    });

    // Update nested profile fields
    if (updateData.profile) {
      loggedInUser.profile = { ...loggedInUser.profile, ...updateData.profile };
    }

    // Update technical skills
    if (updateData.technicalSkills) {
      loggedInUser.technicalSkills = { ...loggedInUser.technicalSkills, ...updateData.technicalSkills };
    }

    // Update professional info
    if (updateData.professionalInfo) {
      loggedInUser.professionalInfo = { ...loggedInUser.professionalInfo, ...updateData.professionalInfo };
    }

    // Update project interests
    if (updateData.projectInterests) {
      loggedInUser.projectInterests = { ...loggedInUser.projectInterests, ...updateData.projectInterests };
    }

    // Update matching preferences
    if (updateData.matchingPreferences) {
      loggedInUser.matchingPreferences = { ...loggedInUser.matchingPreferences, ...updateData.matchingPreferences };
    }

    // Update privacy settings
    if (updateData.privacySettings) {
      loggedInUser.privacySettings = { ...loggedInUser.privacySettings, ...updateData.privacySettings };
    }

    await loggedInUser.save();

    res.json({
      success: true,
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser.getPublicProfile ? loggedInUser.getPublicProfile() : loggedInUser
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "ERROR: " + err.message
    });
  }
});

// Get public profile by ID
profileRouter.get("/profile/:userId", userAuth, async (req, res) => {
  try {
    const User = require("../models/user"); // Adjust path as needed
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: user.getPublicProfile ? user.getPublicProfile() : user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "ERROR: " + err.message
    });
  }
});

// Update profile completion
profileRouter.patch("/profile/complete-section", userAuth, async (req, res) => {
  try {
    const { section } = req.body;
    const loggedInUser = req.user;

    if (!section) {
      throw new Error("Section name is required");
    }

    // Add section to completed sections if not already there
    if (!loggedInUser.profileCompletion.completedSections.includes(section)) {
      loggedInUser.profileCompletion.completedSections.push(section);
    }

    // Recalculate completion percentage
    if (loggedInUser.calculateProfileCompletion) {
      loggedInUser.calculateProfileCompletion();
    }

    await loggedInUser.save();

    res.json({
      success: true,
      message: `Section '${section}' marked as complete`,
      data: {
        profileCompletion: loggedInUser.profileCompletion
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "ERROR: " + err.message
    });
  }
});

module.exports = profileRouter;