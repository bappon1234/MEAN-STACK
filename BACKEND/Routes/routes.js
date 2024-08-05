require('dotenv').config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.js");
const secretKey = "2dschd5cssdvvsdvsdcsdc"

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        // Create new user
        user = new User({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        // Create JWT payload
        const payload = { user: { id: user.id } };

        // Sign JWT
        jwt.sign(payload, secretKey, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ success: true, token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        // Create JWT payload
        const payload = { user: { id: user.id } };

        // Sign JWT
        jwt.sign(payload, secretKey, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ success: true, token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
