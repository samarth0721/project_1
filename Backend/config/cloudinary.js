const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.log("Error in connecting Cloudinary");
    console.log(error.message);
  }
};

module.exports = { connect: connectCloudinary };
