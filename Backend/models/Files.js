const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new mongoose.Schema({
    iceName:{
        type:String,
        required:true
    },
    iceUrl:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    }
    
})

const File = mongoose.model("File",fileSchema);
module.exports = File;