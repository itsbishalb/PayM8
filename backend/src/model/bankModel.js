const mongoose = require('mongoose');

// Define the Bank schema
const bankSchema = new mongoose.Schema({
  emailID: {
    type: String,
    unique: true, // Ensure each emailID is unique
    required: true, // Make the emailID field required
  },
  balance: {
    type: Number,
    default: 0, // Set a default balance of 0
  },
});

// Create a model based on the schema
const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
