const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    // Basic info (existing fields - keep these for backward compatibility)
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
    
    // New enhanced fields
    "headline",
    "bio",
    "website",
    "github",
    "linkedin",
    "portfolio",
    "currentRole",
    "experienceLevel",
    "availability"
  ];

  // Also allow nested fields for the enhanced model
  const allowedNestedFields = [
    "profile.headline",
    "profile.bio",
    "profile.location",
    "profile.website",
    "profile.github",
    "profile.linkedin",
    "profile.portfolio",
    "professionalInfo.currentRole",
    "professionalInfo.experienceLevel",
    "professionalInfo.openTo",
    "professionalInfo.availability",
    "technicalSkills.programmingLanguages",
    "technicalSkills.frameworks",
    "technicalSkills.databases",
    "technicalSkills.tools",
    "technicalSkills.cloudPlatforms",
    "projectInterests.types",
    "projectInterests.teamSize",
    "projectInterests.commitmentLevel",
    "matchingPreferences.skillMatchWeight",
    "matchingPreferences.interestMatchWeight",
    "matchingPreferences.experienceMatchWeight",
    "matchingPreferences.locationMatchWeight",
    "matchingPreferences.preferredTechStack",
    "matchingPreferences.avoidTechStack",
    "privacySettings.profileVisibility",
    "privacySettings.showAge",
    "privacySettings.showEmail",
    "privacySettings.showLocation"
  ];

  const updates = Object.keys(req.body);
  
  const isEditAllowed = updates.every((field) => {
    // Check basic fields
    if (allowedEditFields.includes(field)) {
      return true;
    }
    
    // Check nested fields
    if (allowedNestedFields.some(allowedField => field.startsWith(allowedField.split('.')[0]))) {
      return true;
    }
    
    return false;
  });

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};