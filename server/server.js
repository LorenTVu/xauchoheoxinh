require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

// --- Import Mongoose Models ---
const Message = require('./models/Message');
const Ping = require('./models/Ping');

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
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
  if (mongoose.connection.readyState === 1) {
    res.status(200).json({
      message: "MongoDB connection successful!",
      readyState: mongoose.connection.readyState,
      databaseName: mongoose.connection.name,
    });
  } else {
    res.status(500).json({
      message: "MongoDB not connected!",
      readyState: mongoose.connection.readyState,
      error: "Check server logs for connection errors.",
    });
  }
});

// --- API Routes for Messages ---

// POST /api/messages: Create a new music message
app.post('/api/messages', async (req, res) => {
  try {
    const { sender, recipient, messageText, songLink, whyNote } = req.body;

    // Basic validation (can be more robust later)
    if (!sender || !recipient || !messageText || !songLink) {
      return res.status(400).json({ message: 'Missing required fields: sender, recipient, messageText, songLink' });
    }

    const newMessage = new Message({
      sender,
      recipient,
      messageText,
      songLink,
      whyNote,
    });

    await newMessage.save(); 
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Error creating message', error: error.message });
  }
});

// GET /api/messages: Fetch all music messages
app.get('/api/messages', async (req, res) => {
  try {
    // Find all messages and sort them by timestamp (newest first)
    const messages = await Message.find().sort({ timestamp: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

// --- API Routes for Ping ---

// POST /api/ping: Record a "Thought of You" ping
app.post('/api/ping', async (req, res) => {
  try {
    const { sender, recipient } = req.body; // Expecting sender and recipient from frontend

    if (!sender || !recipient) {
      return res.status(400).json({ message: 'Missing sender or recipient for ping' });
    }

    const newPing = new Ping({ sender, recipient });
    await newPing.save();
    res.status(201).json({ message: `${sender} sent a ping to ${recipient}!`, ping: newPing });
  } catch (error) {
    console.error('Error sending ping:', error);
    res.status(500).json({ message: 'Error sending ping', error: error.message });
  }
});

// GET /api/ping: Fetch recent pings (optional, for viewing history)
app.get('/api/ping', async (req, res) => {
  try {
    const pings = await Ping.find().sort({ timestamp: -1 }).limit(10); // Get last 10 pings
    res.status(200).json(pings);
  } catch (error) {
    console.error('Error fetching pings:', error);
    res.status(500).json({ message: 'Error fetching pings', error: error.message });
  }
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
