const express = require('express');
const router = express.Router();
const MoneyTransaction = require('../model/moneyTransaction');
const Withdrawal = require('../model/withdrawModel');
const Deposit = require('../model/depositModel');

router.get('/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;

        // Fetch transactions for the given user
        const allMoneyTransactions = await MoneyTransaction.find({
            $or: [{ senderEmail: userEmail }, { receiverEmail: userEmail }],
        }, 'amount date senderEmail receiverEmail transactionType');

        // Separate transactions into 'send' and 'received'
        const sendMoneyTransactions = allMoneyTransactions.filter(tx => tx.transactionType === 'send' && tx.senderEmail === userEmail);
        console.log("Send Money Transactions:", sendMoneyTransactions);
        const receivedMoneyTransactions = allMoneyTransactions.filter(tx => tx.transactionType === 'received' && tx.receiverEmail === userEmail);
        console.log("Received Money Transactions:", receivedMoneyTransactions);

        const withdrawalTransactions = await Withdrawal.find({ userEmail: userEmail }, 'amount date');
        const depositTransactions = await Deposit.find({ userEmail: userEmail }, 'amount date');

        // Process transactions to include only required fields
        const processedTransactions = [
            ...sendMoneyTransactions.map(tx => ({
                amount: tx.amount,
                date: tx.date,
                type: tx.transactionType,
            })),
            ...receivedMoneyTransactions.map(tx => ({
                amount: tx.amount,
                date: tx.date,
                type: tx.transactionType,
                counterpart: tx.senderEmail,
            })),
            ...withdrawalTransactions.map(tx => ({
                amount: tx.amount,
                date: tx.date,
                type: 'Withdrawal',
            })),
            ...depositTransactions.map(tx => ({
                amount: tx.amount,
                date: tx.date,
                type: 'Deposit',
            })),
        ];

        // Sort transactions by date in descending order (most recent first)
        processedTransactions.sort((a, b) => b.date - a.date);

        res.json(processedTransactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;