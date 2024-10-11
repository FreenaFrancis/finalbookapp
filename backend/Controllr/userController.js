const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Make sure to include this middleware in your Express app

// Register function
const Register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        await userModel.create({ name, email, password: hash });
        res.json({ status: "success" });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

// // Login function
// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ status: "error", message: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ status: "error", message: "Incorrect password" });
//         }

//         const token = jwt.sign(
//             { email: user.email, role: user.role },
//             "jwt-secret-key",
//             { expiresIn: '1d' }
//         );

//         res.cookie("token", token, { httpOnly: true });
//         return res.json({ status: "success", role: user.role, token });
//     } catch (err) {
//         res.status(500).json({ status: "error", message: "Internal server error" });
//     }
// };


const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ status: "error", message: "Incorrect password" });
      }
  
      const token = jwt.sign(
        { email: user.email, role: user.role, userId: user._id },
        "jwt-secret-key",
        { expiresIn: '1d' }
      );
  
      // Send token as HTTP-only cookie
      res.cookie("token", token, { httpOnly: true });
  
      // Return token and userId in response for storing in front-end
      return res.json({
        status: "success",
        role: user.role,
        token,
        userId: user._id // Include userId in the response
      });
    } catch (err) {
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };
// Verify User middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded; // Attach decoded user data to req
        next();
    });
};

// Is Admin middleware
const isAdmin = async (req, res, next) => {
    try {
      
      
        const user = await userModel.findById(req.params.id);
        if (user.role !== 'admin') {
            return res.status(403).send({ success: false, message: 'Unauthorized Access' });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Error in admin middleware", error });
    }
};


// logout

// app.post('/api/logout', (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: true, // Use `true` if the app is using HTTPS
//     sameSite: 'strict',
//     path: '/',    // Specify the same path used when setting the cookie
//   });
//   res.status(200).json({ message: 'Token removed successfully' });
// });

// import React from 'react';
// import Cookies from 'js-cookie'; // Import js-cookie library

// function Logout() {
//   const handleLogout = () => {
//     Cookies.remove('token'); // Remove the token cookie
//     console.log('Token removed from cookies');
//     // Redirect user to login page or perform additional actions
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// }

// export default Logout;

const getAllUser=(req,res)=>{
  try{
    const users=userModel.find()
    .then((data)=>{
res.send(data)
console.log(data);

    })
  }catch(err)
{
  console.log(err);
  
}}

// const getUserById=async(req,res)=>{
//   try{
// const id=req.params.id
// const user=await userModel.findById(id)
// res.send(user)
// console.log(user);
//   }catch(err){
//     console.log(err);
    
//   }
// }
const getUserById = async (req, res) => {
  try {
      const id = req.params.id;
      const user = await userModel.findById(id);

      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send(user); // Send the user object
      console.log(user);
  } catch (err) {
      console.error(err); // Use console.error for error logging
      res.status(500).send({ message: 'Server error' }); // Send error response
  }
};

const editUser=async(req,res)=>{
  try{

    const id=req.params.id
    const user=await userModel.findById(id, req.body, { new: true })
    res.send(user)
    console.log(user);
  }catch(err){
    console.log(err);
    
  }
}
module.exports = { Register, login, verifyUser, isAdmin,getAllUser,getUserById,editUser };








// const userModel = require("../models/user");
// const { hashPassword, comparePassword, generateToken } = require("../helpers/authHelper");
// // const orderModel = require("../models/OrderModel");


// const registerController = async (req, res) => {
//     try {
//         const { name, email, password, phone, address, answer } = req.body;

//         // Validation
//         if (!name || !email || !password || !phone || !address || !answer) {
//             return res.status(400).send({ error: "All fields are required" });
//         }

//         // Check existing user
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(409).send({
//                 success: false,
//                 message: "User already exists"
//             });
//         }

//         // Hash password
//         const hashedPassword = await hashPassword(password);

//         // Register user
//         const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();
//         res.status(201).send({
//             success: true,
//             message: "User registered successfully"
//         });
//         console.log(user);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({
//             success: false,
//             message: "Error in registration",
//             error: err.message // Send error message to client
//         });
//     }
// };

// const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validation
//         if (!email || !password) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Email and password are required"
//             });
//         }

//         // Check user existence
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Email is not registered"
//             });
//         }

//         // Compare passwords
//         const match = await comparePassword(password, user.password);
//         if (!match) {
//             return res.status(401).send({
//                 success: false,
//                 message: "Invalid password"
//             });
//         }

//         // Generate token
//         const token = generateToken(user.id);

//         // Send success response with token
//         res.status(200).send({
//             success: true,
//             message: "Login successful",
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 address: user.address,
//                 role:user.role

//             },
//             token
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error in login",
//             error: error.message // Send error message to client
//         });
//     }
// };

// // forgetPasswordController
// const forgetPasswordController = async (req, res) => {
//     try {
//         const { email, answer, newPassword } = req.body;

//         if (!email) {
//             return res.status(400).send({ message: "Email is required" });
//         }
//         if (!answer) {
//             return res.status(400).send({ message: "Answer is required" });
//         }
//         if (!newPassword) {
//             return res.status(400).send({ message: "New password is required" });
//         }

//         // Check if the user exists
//         const user = await userModel.findOne({ email, answer });
//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'Wrong email or answer'
//             });
//         }

//         // Hash the new password and update the user's password
//         const hashed = await hashPassword(newPassword);
//         await userModel.findByIdAndUpdate(user._id, { password: hashed });

//         res.status(200).send({
//             success: true,
//             message: "Password reset successfully"
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Something went wrong",
//             error: error.message // Send error message to client
//         });
//     }
// };

// // testController
// const testController = (req, res) => {
//     try {
//         res.send("Protected route");
//         console.log('Protected Route');
//     } catch (error) {
//         console.log(error);
//         res.send({ error: error });
//     }
// };

// // update-controller
// const updateProfileController = async (req, res) => {
//     try {
//       const { name, email, password, address, phone } = req.body;
//       const user = await userModel.findById(req.user._id);
//       //password
//       if (password && password.length < 6) {
//         return res.json({ error: "Passsword is required and 6 character long" });
//       }
//       const hashedPassword = password ? await hashPassword(password) : undefined;
//       const updatedUser = await userModel.findByIdAndUpdate(
//         req.user._id,
//         {
//           name: name || user.name,
//           password: hashedPassword || user.password,
//           phone: phone || user.phone,
//           address: address || user.address,
//         },
//         { new: true }
//       );
//       res.status(200).send({
//         success: true,
//         message: "Profile Updated SUccessfully",
//         updatedUser,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({
//         success: false,
//         message: "Error WHile Update profile",
//         error,
//       });
//     }
//   };


// //   get order
// // const getOrdersController = async (req, res) => {
// //     try {
// // const orders=await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name")
// // res.json(orders)
// //     }catch(error){
// //         res.status(500).send({
// //             success: false,
// //             message: "Error WHile getting orders",
// //             error,
// //           });  
// //     }
// // }


// // //  get all order
// // const getAllOrdersController = async (req, res) => {
// //     try {
// //       const orders = await orderModel
// //         .find({})
// //         .populate("products", "-photo")
// //         .populate("buyer", "name")
// //         .sort({ createdAt: "-1" });
// //       res.json(orders);
// //     } catch (error) {
// //       console.log(error);
// //       res.status(500).send({
// //         success: false,
// //         message: "Error WHile Geting Orders",
// //         error,
// //       });
// //     }
// //   };

// // const getOrdersController = async (req, res) => {
// //     try {
// //       const orders = await orderModel
// //         .find({ buyer: req.user._id })
// //         .populate("products", "-photo")
// //         .populate("buyer", "name");
// //       res.json(orders);
// //     } catch (error) {
// //       console.log(error);
// //       res.status(500).send({
// //         success: false,
// //         message: "Error WHile Geting Orders",
// //         error,
// //       });
// //     }
// //   };
// //   //orders
// //   const getAllOrdersController = async (req, res) => {
// //     try {
// //       const orders = await orderModel
// //         .find({})
// //         .populate('products', '-photo')
// //         .populate('buyer', 'name')
// //         .sort({ createdAt: -1 });
// //       res.json(orders);
// //     } catch (error) {
// //       res.status(500).send({
// //         success: false,
// //         message: 'Error while getting orders',
// //         error,
// //       });
// //     }
// //   };

// // //   getOrderStatus

// // const orderstatusController=async(req,res)=>{
// //     try{
// // const {orderId}=req.params
// // const {status}=req.body
// // const orders = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
// // res.json(orders)
// //     }
// //     catch(error){
// //         console.log(error);
// //         res.status(500).send({
// //             success: false,
// //             message: 'Error while getting orders',
// //             error,
        
// //     })
// // }}
  

// module.exports = { registerController, loginController, testController, forgetPasswordController,updateProfileController,
//     // getOrdersController,getAllOrdersController,orderstatusController
//      }
