const express = require('express');
const User = require('../model/user'); // Adjust the path as needed
const Bank = require('../model/bankModel'); // Adjust the path as needed
const userRouter = express.Router();

// GET request to fetch a user by email without authentication
userRouter.get('/:email', async (req, res) => {
  const userEmail = req.params.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userBalance = await Bank.findOne({ emailID: userEmail });

    // Extract the user details including balance
    const { firstName, lastName, email, dob, phone, address} = user;

    // Respond with the user details and balance
    res.json({
      firstName,
      lastName,
      email,
      dob,
      phone,
      address,
      balance: userBalance.balance ? userBalance.balance : 0, // Provide a default balance if it's not available
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

module.exports = userRouter;
