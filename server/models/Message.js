const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String, // You can use a simple string for now (e.g., "YourName")
    required: true,
  },
  recipient: {
    type: String, // E.g., "HerName"
    required: true,
  },
  messageText: {
    type: String,
    required: true,
  },
  songLink: {
    type: String, // URL to the song (YouTube, Spotify, etc.)
    required: true,
  },
  whyNote: {
    type: String, // The "Why this song?" explanation
    default: "", // Optional field, so can be empty
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set to the current time when a message is created
  },
});

// Create the Mongoose Model from the schema
const Message = mongoose.model("Message", messageSchema);

module.exports = Message; // Export the Message model
