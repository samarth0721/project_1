// const Delivery = require("../models/Delivery");

// exports.createDelivery = async (req,res,) =>{
//     try{
//         const email = req.user.email;
//         const {name,contact,streetAdd,city,pin,district} = req.body;

//         const newDelivery = await Delivery.create({
//             name,email,contact,streetAdd,city,pin,district,
//         });
//         res.status(201).json({
//             success:true,
//             message:"Delivery added successfully",
//             delivery: newDelivery,
//         })
//     }
//     catch(error){
//         res.status(500).json({
//             success:false,
//             message:"failed to add delivery"
//         })
//     }
// }

// exports.getMyDeliveries = async (req, res) => {
//   try {
//     const email = req.user.email;

//     const deliveries = await Delivery.find({ email }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: deliveries.length,
//       deliveries,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch deliveries",
//     });
//   }
// };
const Delivery = require("../models/Delivery");

exports.createDelivery = async (req, res) => {  // Removed extra comma after 'res'
    try {
        // Check if user is authenticated (from middleware)
        if (!req.user || !req.user.email) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const email = req.user.email;
        const { name, contact, streetAdd, city, pin, district } = req.body;

        // Basic validation
        if (!name || !contact || !streetAdd || !city || !pin || !district) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newDelivery = await Delivery.create({
            name, email, contact, streetAdd, city, pin, district
        });

        res.status(201).json({
            success: true,
            message: "Delivery added successfully",
            delivery: newDelivery
        });
    } catch (error) {
        console.error("Create delivery error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add delivery"
        });
    }
};

exports.getMyDeliveries = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.email) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const email = req.user.email;

        const deliveries = await Delivery.find({ email }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: deliveries.length,
            deliveries
        });
    } catch (error) {
        console.error("Get deliveries error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch deliveries"
        });
    }
};