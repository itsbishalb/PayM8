const express = require('express');
const router = express.Router();
const User = require('../model/user');
const MoneyTransaction = require('../model/moneyTransaction');
const Bank = require('../model/bankModel');
const mongoose = require('mongoose');

// POST route to send money
router.post('/', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        console.log("Request Body:", req.body);
        const { senderEmail, receiverEmail, amount } = req.body;
        if (!senderEmail || !receiverEmail || !amount) {
            return res.status(400).json({ message: "Missing required field" });
        }

        if (senderEmail === receiverEmail) {
            return res.status(400).json({ message: "Sender and receiver cannot be the same" });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be greater than zero" });
        }

        const sender = await User.findOne({ email: senderEmail });
        const receiver = await User.findOne({ email: receiverEmail });

        if (!sender || !receiver) {
            return res.status(404).json({ message: "Sender or receiver not found" });
        }

        // Check if sender has sufficient balance
        const senderBank = await Bank.findOne({ emailID: senderEmail });
        if (!senderBank || senderBank.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const currentBalance = parseFloat(senderBank.balance);
        const transferAmount = parseFloat(amount);

        // Deduct the transfer amount from sender's balance
        senderBank.balance = currentBalance - transferAmount;

        // Create a new send transaction for the sender
        const senderTransaction = new MoneyTransaction({
            senderEmail,
            receiverEmail,
            amount: transferAmount, // Negative amount for sender
            transactionType: 'send'
        });

        await senderTransaction.save(); // Save sender's transaction first

        // Credit the amount to receiver's balance
        const receiverBank = await Bank.findOne({ emailID: receiverEmail });
        if (!receiverBank) {
            throw new Error("Receiver bank not found");
        }

        receiverBank.balance += transferAmount; // Credit the amount to the receiver

        // Create a new receive transaction for the receiver
        const receiverTransaction = new MoneyTransaction({
            senderEmail,
            receiverEmail,
            amount: transferAmount, // Positive amount for receiver
            transactionType: 'received'
        });

        await senderBank.save(); // Update sender's balance
        await receiverTransaction.save(); // Save receiver's transaction

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ senderTransaction, receiverTransaction });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
