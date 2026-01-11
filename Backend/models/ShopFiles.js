const mongoose = require("mongoose");
const { Schema } = mongoose;

const shopFilesSchema = new mongoose.Schema({
    shopName:{
        type:String,
        required:true,
    },
    shopImageUrl:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    }
})

const shopFile = mongoose.model("shopFile",shopFilesSchema);
module.exports = shopFile;