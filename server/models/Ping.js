const mongoose = require('mongoose');

const pingSchema = new mongoose.Schema({
  sender: {
    type: String, // E.g., "YourName"
    required: true,
  },
  recipient: {
    type: String, // E.g., "HerName"
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set to the current time
  },
});

const Ping = mongoose.model('Ping', pingSchema);

module.exports = Ping;