const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role, adminCode, phone } = req.body; // Added adminCode, phone

        // Handle admin signup validation
        if (role === "Admin") {
            if (!adminCode || adminCode !== process.env.ADMIN_CODE) { // Use env var for admin code
                return res.status(400).json({
                    success: false,
                    message: "Invalid admin code"
                });
            }
            if (!phone) {
                return res.status(400).json({
                    success: false,
                    message: "Phone number required for admin"
                });
            }
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            });
        }

        let user = await User.create({
            name, email, password: hashedPassword, role, ...(role === "Admin" && { phone })
        });

        return res.status(200).json({
            success: true,
            message: "User entry created"
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try later",
        });
    }
};

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Trim and convert email to lowercase
        email = email.trim().toLowerCase();

        // Find user in DB
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ success: false, message: "Incorrect password" });
        }

        // Create JWT payload and token
        const payload = { email: user.email, id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Convert user and hide password
        user = user.toObject();
        delete user.password; // Use delete instead of undefined for clarity

        // Attach cookie (optional, since token is returned)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true in production
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day in ms
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

exports.profile = async (req, res) => {
    try {
        // Use lightweight auth from middleware or manual token extraction
        let token = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password -__v');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone || null,
            }
        });
    } catch (error) {
        console.error('Profile error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Add this to the end of your Auth.js file (after exports.profile)
exports.updateProfile = async (req, res) => {
    try {
        let token = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ success: false, message: 'Name and email required' });
        }

        // Check email uniqueness (exclude current user)
        const existingEmail = await User.findOne({ email, _id: { $ne: decoded.id } });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            { name, email },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone || null,
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
};