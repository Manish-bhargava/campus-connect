const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      // validate(value) {
      //   if (!validator.isStrongPassword(value)) {
      //     throw new Error("Password must be at least 8 characters with uppercase, lowercase, number and symbol");
      //   }
      // },
    },
    age: {
      type: Number,
      min: 18,
      max: 100
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "non-binary", "prefer-not-to-say"],
        message: `{VALUE} is not a valid gender type`,
      },
    },
    
    // Enhanced Profile Fields
    profile: {
      headline: {
        type: String,
        maxLength: 120,
        default: "Full Stack Developer"
      },
      bio: {
        type: String,
        maxLength: 500,
        default: "Passionate developer looking to collaborate on exciting projects!"
      },
      location: {
        city: String,
        country: String,
        timezone: String
      },
      website: {
        type: String,
        validate: {
          validator: function(v) {
            return !v || validator.isURL(v);
          },
          message: "Invalid website URL"
        }
      },
      github: String,
      linkedin: String,
      portfolio: String
    },

    // Technical Skills & Stack
    technicalSkills: {
      programmingLanguages: [{
        name: String,
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced", "expert"],
          default: "intermediate"
        },
        yearsOfExperience: Number
      }],
      frameworks: [String],
      databases: [String],
      tools: [String],
      cloudPlatforms: [String]
    },

    // Professional Information
    professionalInfo: {
      currentRole: String,
      experienceLevel: {
        type: String,
        enum: ["student", "junior", "mid-level", "senior", "lead", "principal", "cto"]
      },
      openTo: {
        collaboration: { type: Boolean, default: true },
        mentorship: { type: Boolean, default: false },
        jobOpportunities: { type: Boolean, default: false },
        freelance: { type: Boolean, default: false }
      },
      availability: {
        type: String,
        enum: ["full-time", "part-time", "weekends", "evenings", "flexible"],
        default: "flexible"
      }
    },

    // Project Preferences
    projectInterests: {
      types: [{
        type: String,
        enum: ["web-dev", "mobile-dev", "ai-ml", "blockchain", "iot", "gaming", "open-source", "startup", "enterprise"]
      }],
      teamSize: {
        min: { type: Number, default: 1 },
        max: { type: Number, default: 10 }
      },
      commitmentLevel: {
        type: String,
        enum: ["casual", "serious", "professional"],
        default: "casual"
      }
    },

    // Premium Features
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
      enum: ["free", "silver", "gold"],
      default: "free"
    },
    premiumExpiresAt: Date,
    
    // Profile Completeness
    profileCompletion: {
      percentage: { type: Number, default: 0 },
      completedSections: [String]
    },

    // Social & Engagement
    socialStats: {
      connectionsCount: { type: Number, default: 0 },
      projectsCompleted: { type: Number, default: 0 },
      rating: { type: Number, default: 0, min: 0, max: 5 },
      reviewsCount: { type: Number, default: 0 }
    },

    // Matching Preferences
    matchingPreferences: {
      skillMatchWeight: { type: Number, default: 40, min: 0, max: 100 },
      interestMatchWeight: { type: Number, default: 30, min: 0, max: 100 },
      experienceMatchWeight: { type: Number, default: 20, min: 0, max: 100 },
      locationMatchWeight: { type: Number, default: 10, min: 0, max: 100 },
      preferredTechStack: [String],
      avoidTechStack: [String]
    },

    // Privacy & Settings
    privacySettings: {
      profileVisibility: {
        type: String,
        enum: ["public", "connections-only", "private"],
        default: "public"
      },
      showAge: { type: Boolean, default: true },
      showEmail: { type: Boolean, default: false },
      showLocation: { type: Boolean, default: true }
    },

    // Verification & Trust
    isVerified: {
      type: Boolean,
      default: false
    },
    verification: {
      email: { type: Boolean, default: false },
      github: { type: Boolean, default: false },
      linkedin: { type: Boolean, default: false },
      phone: { type: Boolean, default: false }
    },

    // Activity Tracking
    lastActive: Date,
    joinDate: {
      type: Date,
      default: Date.now
    },

    // Media
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!value) return true;
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    coverPhoto: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || validator.isURL(v);
        },
        message: "Invalid cover photo URL"
      }
    },

    // Status
    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "deleted"],
      default: "active"
    }
  },
  {
    timestamps: true,
  }
);

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for profile URL
userSchema.virtual('profileUrl').get(function() {
  return `/profile/${this._id}`;
});

// Indexes for better performance
userSchema.index({ emailId: 1 });
userSchema.index({ "technicalSkills.programmingLanguages.name": 1 });
userSchema.index({ "professionalInfo.experienceLevel": 1 });
userSchema.index({ "profile.location.city": 1 });
userSchema.index({ "profileCompletion.percentage": -1 });
userSchema.index({ "socialStats.rating": -1 });
userSchema.index({ lastActive: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // if (this.isModified('password')) {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
  
  // Calculate profile completion percentage
  if (this.isModified()) {
    this.calculateProfileCompletion();
  }
  
  next();
});

// Methods
userSchema.methods.getJWT = function() {
  return jwt.sign(
    { 
      _id: this._id,
      email: this.emailId,
      isPremium: this.isPremium
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: "7d" }
  );
};

// userSchema.methods.validatePassword = async function(passwordInputByUser) {
//   return await bcrypt.compare(passwordInputByUser, this.password);
// };

userSchema.methods.calculateProfileCompletion = function() {
  const totalFields = 15; // Adjust based on important fields
  let completedFields = 0;

  if (this.firstName && this.lastName) completedFields++;
  if (this.photoUrl && this.photoUrl !== "https://geographyandyou.com/images/user-profile.png") completedFields++;
  if (this.profile?.bio && this.profile.bio.length > 10) completedFields++;
  if (this.profile?.headline) completedFields++;
  if (this.technicalSkills?.programmingLanguages?.length > 0) completedFields++;
  if (this.professionalInfo?.currentRole) completedFields++;
  if (this.professionalInfo?.experienceLevel) completedFields++;
  if (this.profile?.location?.city) completedFields++;
  if (this.profile?.github) completedFields++;
  if (this.age) completedFields++;
  if (this.gender) completedFields++;
  if (this.projectInterests?.types?.length > 0) completedFields++;
  if (this.professionalInfo?.openTo) completedFields++;
  if (this.technicalSkills?.frameworks?.length > 0) completedFields++;
  if (this.about && this.about.length > 20) completedFields++;

  this.profileCompletion.percentage = Math.round((completedFields / totalFields) * 100);
};

userSchema.methods.getPublicProfile = function() {
  const publicProfile = this.toObject();
  
  // Remove sensitive information
  delete publicProfile.password;
  delete publicProfile.emailId;
  if (!this.privacySettings.showEmail) delete publicProfile.emailId;
  if (!this.privacySettings.showAge) delete publicProfile.age;
  if (!this.privacySettings.showLocation) delete publicProfile.profile.location;
  
  return publicProfile;
};

userSchema.methods.isProfileComplete = function() {
  return this.profileCompletion.percentage >= 80;
};


module.exports = mongoose.model("User", userSchema);
