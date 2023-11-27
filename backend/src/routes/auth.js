const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../model/user');
const Bank = require('../model/bankModel');

const authRouter = express.Router();

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ email }, 'YourSecretKey', { expiresIn: '1h' });
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error during login' });
    }
};

const signup = async (req, res) => {
    const { firstName, lastName, email, password, dob, phone, address } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dob,
            phone,
            address
        });

        // Create a bank associated with the user
        const bank = new Bank({
            emailID: email,
        });

        // Save the user and bank
        await Promise.all([user.save(), bank.save()]);

        // Set the user's bank field to the bank's _id
        user.bank = bank._id;
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ email }, 'YourSecretKey', { expiresIn: '1h' });

        res.status(201).json({ message: 'User created', token });
    } catch (error) {
        console.log("User Creation Failed " + error.message);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.get('/login', (req, res) => {
    res.send("Login page");
})
authRouter.get('/signup', (req, res) => {
    res.send("Signup page");
})

module.exports = {authRouter};
