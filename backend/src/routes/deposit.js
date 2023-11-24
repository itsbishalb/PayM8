const express = require('express');
const Deposit = require('../model/depositModel');
const User = require('../model/user');
const Bank = require('../model/bankModel');

const depositRouter = express.Router();

// POST request to create a new deposit
depositRouter.post('/', async (req, res) => {
    try {
        const { email, amount, method, paypalAccount, bankDetails } = req.body;

        // Check if the user with the specified email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new deposit object based on the schema
        const newDeposit = new Deposit({
            userEmail: email,
            amount,
            method,
            paypalAccount: method === 'paypal' ? paypalAccount : null,
            bankDetails: method === 'bank' ? {
                bankAccountHolder: bankDetails?.bankAccountHolder,
                bankAccountNumber: bankDetails?.bankAccountNumber,
                sortCode: bankDetails?.sortCode
            } : null
        });

        // Save the deposit
        await newDeposit.save();

        // Update the bank balance by adding the deposit amount
        // Find the bank associated with the user
        const bank = await Bank.findOne({ emailID: email });
        const currentBalance = parseFloat(bank.balance);
        const depositAmount = parseFloat(amount);
        if (bank) {
            // Add the deposit amount to the bank balance
            bank.balance = currentBalance + depositAmount;
            await bank.save();
        }

        res.status(201).json({ message: 'Deposit created', deposit: newDeposit });
    } catch (error) {
        console.error("Error in deposit route:", error.message);
        res.status(500).json({ message: 'Error creating deposit', error: error.message });
    }
});

// GET request to fetch all deposits for a specific user
depositRouter.get('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
    try {
        const deposits = await Deposit.find({ userEmail });
        res.json(deposits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deposits', error: error.message });
    }
});

module.exports = depositRouter;
