const express = require('express');
const Deposit = require('../model/depositModel');

const depositRouter = express.Router();

// POST request to create a new deposit
depositRouter.post('/', async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { email, amount, method, paypalAccount, bankDetails } = req.body;

        // Create a new deposit object based on the schema
        const newDeposit = new Deposit({
            userEmail: email,
            amount,
            method,
            paypalAccount: method === 'paypal' ? paypalAccount : undefined,
            bankDetails: method === 'bank' ? {
                bankAccountHolder: bankDetails?.bankAccountHolder,
                bankAccountNumber: bankDetails?.bankAccountNumber,
                sortCode: bankDetails?.sortCode
            } : undefined
        });

        console.log("New Deposit:", newDeposit);

        await newDeposit.save();
        res.status(201).json({ message: 'Deposit created', deposit: newDeposit });

        console.log("Deposit created");
    } catch (error) {
        console.error("Error in deposit route:", error.message);
        res.status(500).json({ message: 'Error creating deposit', error: error.message });
    }
});


// GET request to fetch all deposits for a specific user
depositRouter.get('/:userEmail', async (req, res) => {
    console.log("depositRouter.get" + req.params.userEmail);
    const userEmail = req.params.userEmail;
    try {
        const deposits = await Deposit.find({ userEmail });
        res.json(deposits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deposits', error: error.message });
    }
});

module.exports = depositRouter;
