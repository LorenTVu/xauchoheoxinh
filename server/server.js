const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const port = process.env.PORT || 5000; // Use port 5000 for the backend by default

// --- Middleware ---
// Enable CORS (Cross-Origin Resource Sharing)
// This allows your frontend (likely on localhost:3000) to make requests to your backend (on localhost:5000)
app.use(cors());
// Enable express to parse JSON request bodies (important for receiving data from frontend)
app.use(express.json());

// --- Simple Test Route ---
// When you visit http://localhost:5000/, this message will be sent back
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
