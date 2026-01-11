const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in .env");
    }

    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.DATABASE_URL, {
      // TLS/SSL is handled automatically by Atlas; no need for deprecated options
      serverSelectionTimeoutMS: 5000, // timeout if cannot connect
    });

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to database:");
    console.error(error.message);

    // Optional: print full error for debugging TLS issues
    console.error(error);

    process.exit(1); // stop server if DB is unreachable
  }
};

module.exports = { connect: dbConnect };
