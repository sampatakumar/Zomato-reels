// src/services/storage.service.js
const ImageKit = require("imagekit");
require("dotenv").config(); // load .env before using process.env

// Initialize ImageKit instance
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

// Utility function to upload a file
async function uploadFile(file, fileName) {
  if (!file || !fileName) {
    throw new Error("File and fileName are required for upload");
  }

  try {
    const result = await imagekit.upload({
      file,       // can be base64 string, file path, or URL
      fileName,   // required: unique name for the file
    });
    return result;
  } catch (err) {
    console.error("ImageKit upload failed:", err.message);
    throw new Error("File upload failed");
  }
}

module.exports = { uploadFile };
