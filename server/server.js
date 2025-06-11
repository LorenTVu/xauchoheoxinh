// At the very top of your server.js file
require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import Mongoose
const app = express();
const port = process.env.PORT || 5000;

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
    // Optional: Log the database name you are connected to
    console.log(`Using database: ${mongoose.connection.name}`);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Simple Test Route (Existing) ---
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// --- New MongoDB Test Route ---
// This route will simply confirm the connection is active
app.get("/db-test", (req, res) => {
  // mongoose.connection.readyState can be:
  // 0 = disconnected
  // 1 = connected
  // 2 = connecting
  // 3 = disconnecting
  if (mongoose.connection.readyState === 1) {
    // 1 means connected
    res.status(200).json({
      message: "MongoDB connection successful!",
      readyState: mongoose.connection.readyState,
      databaseName: mongoose.connection.name, // The name of the database it connected to
    });
  } else {
    res.status(500).json({
      message: "MongoDB not connected!",
      readyState: mongoose.connection.readyState,
      error: "Check server logs for connection errors.",
    });
  }
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
