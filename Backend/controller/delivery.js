const Delivery = require("../models/Delivery");

exports.createDelivery = async (req,res,) =>{
    try{
        const email = req.user.email;
        const {name,contact,streetAdd,city,pin,district} = req.body;

        const newDelivery = await Delivery.create({
            name,email,contact,streetAdd,city,pin,district,
        });
        res.status(201).json({
            success:true,
            message:"Delivery added successfully",
            delivery: newDelivery,
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"failed to add delivery"
        })
    }
}

exports.getMyDeliveries = async (req, res) => {
  try {
    const email = req.user.email;

    const deliveries = await Delivery.find({ email }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: deliveries.length,
      deliveries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch deliveries",
    });
  }
};