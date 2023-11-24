const express = require('express');
const router = express.Router();
const SendMoney = require('../model/sendModel');
const Withdrawal = require('../model/withdrawModel');
const Deposit = require('../model/depositModel');

router.get('/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;

        // Fetch transactions for the given user
        const sendMoneyTransactions = await SendMoney.find({ userEmail: userEmail }, 'amount date receiverEmail');
        const withdrawalTransactions = await Withdrawal.find({ userEmail: userEmail }, 'amount date');
        const depositTransactions = await Deposit.find({ userEmail: userEmail }, 'amount date');

        // Process transactions to include only required fields
        const processedTransactions = [
            ...sendMoneyTransactions.map(tx => ({
                amount: tx.amount,
                date: tx.date,
                type: `Send to ${tx.receiverEmail}`
            })),
            ...withdrawalTransactions.map(tx => ({
                amount: tx.amount,
                date: tx.date,
                type: 'Withdrawal'
            })),
            ...depositTransactions.map(tx => ({
                amount: tx.amount,
                date: tx.date,
                type: 'Deposit'
            }))
        ];

        res.json(processedTransactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
