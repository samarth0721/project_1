const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            })
        }

        let user = await User.create({
            name, email, password: hashedPassword, role,
        })

        return res.status(200).json({
            success: true,
            message: "User entry created"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try later",
        })
    }
}

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
        user.password = undefined;

        // Attach cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // change to true if using HTTPS
            sameSite: "lax", // or "none" if frontend is on different domain with HTTPS
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // optional
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

exports.profile = async (req, res) => {
  try {
    const email = req.user.email;

    const data = await User.find({ email }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch deliveries",
    });
  }
};
