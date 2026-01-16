const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

console.log("\n🔥 LOADING APPLOAD.JS...");
console.log("☁️ Cloudinary Config Name:", process.env.CLOUDINARY_NAME);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    // I specifically set this to 'profile_photos' to fix the error
    folder: "profile_photos", 
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// DEBUG: Log the internal storage configuration
console.log("📂 Storage Params Configured:", storage.params || "Hidden by library");

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;