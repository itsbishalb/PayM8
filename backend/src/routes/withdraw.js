const express = require('express');
const Withdraw = require('../model/withdrawModel');

const withdrawRouter = express.Router();

// POST request to create a new withdrawal
withdrawRouter.post('/', async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { userEmail, amount, method, paypalAccount, bankDetails } = req.body;

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

        await newWithdrawal.save();
        res.status(201).json({ message: 'Withdrawal created', withdrawal: newWithdrawal });
    } catch (error) {
        console.error("Error in withdrawal route:", error.message);
        res.status(500).json({ message: 'Error creating withdrawal', error: error.message });
    }
});


// GET request to fetch all withdrawals for a specific user
withdrawRouter.get('/:userEmail', async (req, res) => {
    console.log("withdrawRouter.get" + req.params.userEmail);
    const userEmail = req.params.userEmail;
    console.log("withdrawRouter.get" + userEmail);
    try {
        const withdrawals = await Withdraw.find({ userEmail });
        res.json(withdrawals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching withdrawals', error: error.message });
    }
});

module.exports = withdrawRouter;
