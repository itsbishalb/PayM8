const mongoose = require('mongoose');

const moneyTransactionSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        required: true
    },
    receiverEmail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        enum: ['send', 'received'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MoneyTransaction', moneyTransactionSchema);
