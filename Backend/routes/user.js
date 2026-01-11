const express = require("express");
const router = express.Router();

const User = require("../models/User");
const File = require("../models/Files");
const shopFile = require("../models/ShopFiles");

const {login,signup,profile}  = require("../controller/Auth");
const {isAdmin,auth,isCustomer} = require("../middleware/auth");
const {imageUpload,shopFileUpload} = require("../controller/fileUpload");
const {createDelivery,getMyDeliveries} = require("../controller/delivery");
const Delivery = require("../models/Delivery");

router.post("/login",login);
router.post("/signup",signup);
router.get("/profile",profile);
router.post("/imageUpload",auth,isAdmin,imageUpload);
router.post("/shopFileUpload",auth,isAdmin,shopFileUpload);

router.get("/admin",isAdmin,(req,res)=>{
    res.json({
        success: true,
        message: "Welcome to Protected Route for Admin"
    })
})

router.get("/customer",isCustomer,(req,res)=>{
    res.json({
        success: true,
        message: "Welcome to Protected Route for customer"
    })
})

router.post("/delivery",auth,isCustomer,createDelivery);
router.get("/deliveries",auth,isCustomer,getMyDeliveries);

router.get("/icecreams", async (req,res)=>{
    try{
        const icecreams = await File.find();
        res.json({
            success:true,
            data:icecreams
        });
    }
    catch(error){
        res.json({
            success:false,
            message:"Server error"
        })
    }
})

router.get("/shop",async (req,res)=>{
    try{
        const shop = await shopFile.find();
        res.json({
            success:true,
            data:shop
        });
    }
    catch(error){
        res.json({
            success:false,
            message:"Server error"
        })
    }
})

module.exports = router;