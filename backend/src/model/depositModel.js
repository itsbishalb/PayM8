const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: async function(email) {
                const user = await mongoose.model('User').findOne({ email });
                return !!user;
            },
            message: 'User does not exist'
        }
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        required: true,
        enum: ['paypal', 'bank']
    },
    paypalAccount: {
        type: String,
        required: function() { return this.method === 'paypal'; },
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v); // Simple email regex
            },
            message: 'Invalid PayPal account email'
        }
    },
    bankDetails: {
        bankAccountHolder: {
            type: String,
            required: function() { return this.method === 'bank'; }
        },
        bankAccountNumber: {
            type: String,
            required: function() { return this.method === 'bank'; }
        },
        sortCode: {
            type: String,
            required: function() { return this.method === 'bank'; }
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Deposit', depositSchema);
