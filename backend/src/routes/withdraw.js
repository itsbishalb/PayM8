const express = require('express');
const Withdraw = require('../model/withdrawModel');
const Bank = require('../model/bankModel'); // Import the Bank model

const withdrawRouter = express.Router();

// POST request to create a new withdrawal
withdrawRouter.post('/', async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { userEmail, amount, method, paypalAccount, bankDetails } = req.body;

        const userBank = await Bank.findOne({ emailID: userEmail });
        if (!userBank) {
            return res.status(404).json({ message: "User bank not found" });
        }

        const userBalance = parseFloat(userBank.balance);

        if (amount > userBalance) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const newWithdrawal = new Withdraw({
            userEmail,
            amount,
            method,
            paypalAccount: method === 'paypal' ? paypalAccount : undefined,
            bankDetails: method === 'bank' ? {
                bankAccountHolder: bankDetails?.bankAccountHolder,
                bankAccountNumber: bankDetails?.bankAccountNumber,
                sortCode: bankDetails?.sortCode
            } : undefined
        });

        // Deduct the withdrawal amount from user's bank balance and save it back
        userBank.balance = (userBalance - amount).toFixed(2); // Convert to float and fix to 2 decimal places
        await userBank.save();

        await newWithdrawal.save();
        res.status(201).json({ message: 'Withdrawal created', withdrawal: newWithdrawal });
    } catch (error) {
        console.error("Error in withdrawal route:", error.message);
        res.status(500).json({ message: 'Error creating withdrawal', error: error.message });
    }
});

// GET request to fetch all withdrawals for a specific user
withdrawRouter.get('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
    try {
        const withdrawals = await Withdraw.find({ userEmail });
        res.json(withdrawals);
    } catch (error) {
        console.error("Error fetching withdrawals:", error.message);
        res.status(500).json({ message: 'Error fetching withdrawals', error: error.message });
    }
});

module.exports = withdrawRouter;
