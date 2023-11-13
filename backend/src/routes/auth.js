
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../model/user');

const authRouter = express.Router();

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ email }, 'YourSecretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error during login' });
    }
};

const signup = async (req, res) => {
    const { firstName, lastName, email, password, dob, phone, address } = req.body;
    console.log(req.body);
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
        await user.save();
        res.status(201).json({ message: 'User created' });
        console.log("User created " + user.email);
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
