// const express = require("express");
// const router = express.Router();

// // Core models (safe)
// const User = require("../models/User");
// const File = require("../models/Files");
// const shopFile = require("../models/ShopFiles");

// // ONLY import confirmed working Auth functions
// const { login, signup, profile, updateProfile } = require("../controller/Auth");

// // NO middleware or other controllers yet - add later

// // Public auth routes (these work)
// router.post("/login", login);
// router.post("/signup", signup);

// // Profile route (works with controller auth)
// router.get("/profile", profile);
// router.put("/profile", updateProfile)

// // Public product routes (inline handlers - no imports needed)
// router.get("/icecreams", async (req, res) => {
//     try {
//         const icecreams = await File.find();
//         res.json({
//             success: true,
//             data: icecreams
//         });
//     } catch (error) {
//         console.error("Icecreams error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// });

// router.get("/shop", async (req, res) => {
//     try {
//         const shop = await shopFile.find();
//         res.json({
//             success: true,
//             data: shop
//         });
//     } catch (error) {
//         console.error("Shop error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// });

// // Test route (simple, no auth)
// router.get("/test", (req, res) => {
//     res.json({ success: true, message: "Server is running!" });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

// Core models
const User = require("../models/User");
const File = require("../models/Files");
const shopFile = require("../models/ShopFiles");
// const passport = require("../middleware/passport");

// Auth controllers (safe import)
let { login, signup, profile, updateProfile } = require("../controller/Auth");
if (!login) login = (req, res) => res.status(501).json({ success: false, message: "Login not implemented" });
if (!signup) signup = (req, res) => res.status(501).json({ success: false, message: "Signup not implemented" });
if (!profile) profile = (req, res) => res.status(501).json({ success: false, message: "Profile not implemented" });
if (!updateProfile) updateProfile = (req, res) => res.status(501).json({ success: false, message: "Update profile not implemented" });

// Middleware (safe)
let { auth, isAdmin, isCustomer ,authMiddleware} = require("../middleware/auth");
if (!auth) auth = (req, res, next) => res.status(401).json({ success: false, message: "Auth middleware missing" });
if (!isAdmin) isAdmin = (req, res, next) => res.status(403).json({ success: false, message: "Admin check missing" });
if (!isCustomer) isCustomer = (req, res, next) => res.status(403).json({ success: false, message: "Customer check missing" });

// Other controllers with safe stubs
let { imageUpload, shopFileUpload } = require("../controller/fileUpload");
let { createDelivery, getMyDeliveries } = require("../controller/delivery");

// Stubs to prevent crashes
if (!imageUpload) imageUpload = (req, res) => res.status(501).json({ success: false, message: "Image upload not ready" });
if (!shopFileUpload) shopFileUpload = (req, res) => res.status(501).json({ success: false, message: "Shop file upload not ready" });
if (!createDelivery) createDelivery = (req, res) => res.status(501).json({ success: false, message: "Delivery creation not ready" });
if (!getMyDeliveries) getMyDeliveries = (req, res) => res.status(200).json({ success: true, deliveries: [] });

// Public auth routes
router.post("/login", login);
router.post("/signup", signup);

// Profile routes
router.get("/profile", profile);
router.put("/profile", updateProfile);

// Admin-only routes
router.post("/imageUpload", auth, isAdmin, imageUpload);
router.post("/shopFileUpload", auth, isAdmin, shopFileUpload);

// Test protected routes
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({ success: true, message: "Welcome Admin!" });
});

router.get("/customer", auth, isCustomer, (req, res) => {
    res.json({ success: true, message: "Welcome Customer!" });
});

// Delivery routes (line 94 fixed - now safe)
router.post("/delivery", auth, isCustomer, createDelivery);
router.get("/deliveries", auth, isCustomer, getMyDeliveries);

// Public product routes
router.get("/icecreams", async (req, res) => {
    try {
        const icecreams = await File.find();
        res.json({ success: true, data: icecreams });
    } catch (error) {
        console.error("Icecreams error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/shop", async (req, res) => {
    try {
        const shop = await shopFile.find();
        res.json({ success: true, data: shop });
    } catch (error) {
        console.error("Shop error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// // OAuth routes (add after public auth routes)
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         // Success: Generate JWT and redirect to frontend with token
//         const token = jwt.sign({ id: req.user._id, email: req.user.email, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         res.redirect(`http://localhost:3000/login?token=${token}`); // Redirect to login with token in query
//     }
// );

// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/auth/facebook/callback', 
//     passport.authenticate('facebook', { failureRedirect: '/login' }),
//     (req, res) => {
//         const token = jwt.sign({ id: req.user._id, email: req.user.email, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         res.redirect(`http://localhost:3000/login?token=${token}`);
//     }
// );

// Test route
router.get("/test", (req, res) => {
    res.json({ success: true, message: "Server running fine!" });
});

module.exports = router;