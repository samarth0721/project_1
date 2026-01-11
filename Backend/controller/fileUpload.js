const File = require("../models/Files");
const shopFile = require("../models/ShopFiles");
const cloudinary = require("cloudinary").v2;


function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {

        const { iceName, tags, description,price } = req.body;
        console.log(iceName, tags, description,price);

        // Fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        const response = await uploadFileToCloudinary(imageFile, "IceName");
        console.log(response)


        // Upload to DB 
        const fileData = await File.create({
            iceName,
            tags,
            description,
            price,
            iceUrl: response.secure_url
        })


        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.shopFileUpload = async (req,res) =>{
    try{
        const {shopName,location,rating} = req.body;

        const shopImage = req.files.shopImage;

        const supportedTypes = ["png","jpg","jpeg"];
        const fileType = shopImage.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File not supported",
            });
        }
        const response = await uploadFileToCloudinary(shopImage,"ShopImage");

        const fileData = await shopFile.create({
            shopName,
            location,
            rating,
            shopImageUrl:response.secure_url
        })

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        })

    }
    catch(error){
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}