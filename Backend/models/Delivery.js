const mongoose = require("mongoose");
const { Schema } = mongoose;

const deliverySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    streetAdd:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pin:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    }
})


module.exports = mongoose.model("Delivery", deliverySchema);