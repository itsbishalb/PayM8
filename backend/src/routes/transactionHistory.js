const Transaction = require('../model/transaction.js');
const express = require('express');
const User = require('../model/user')

const transactionRouter = express.Router();

transactionRouter.post('/', async (req, res) => {
    console.log(req.body);
    const { userEmail, amount, description, date } = req.body;

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newTransaction = new Transaction({
            userEmail: user.email,
            amount,
            description,
            date
        });

        const savedTransaction = await newTransaction.save();

        res.status(201).json({ message: 'Transaction created', transaction: savedTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
});

transactionRouter.post('/transaction', Transaction);
module.exports = transactionRouter;