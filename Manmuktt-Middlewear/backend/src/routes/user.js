const dotenv = require("dotenv");
dotenv.config();
const Router = require("express");
const authRoute = Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel.js");
const crypto = require('crypto');
const mongoose = require('mongoose');
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const handlebars = require("handlebars");
const ObjectId = mongoose.Types.ObjectId;

const generateToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

// signup //
authRoute.post("/signup", async (req, res) => {
  const { userName, email } = req.body;

  // Regular expression to validate email format
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email is valid
  if (!emailReg.test(email)) {
    return res
      .status(400)
      .send({ message: "Please provide a valid email address." });
  }

  // Check if username or email already exists
  const existingUser = await userModel.findOne({ email });
  
  // Additionally check for username separately
  const existingUserName = await userModel.findOne({ userName });

  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }
  
  if (existingUserName) {
    return res.status(400).json({ message: "Username already registered" });
  }
  
  const token = generateToken();
  const hashedToken = await bcrypt.hash(token, 10);

  // Prepare to send the signup email before saving the user
  const directory = path.join(__dirname, "..", "utils", "signupEmail.html");
  const fileRead = fs.readFileSync(directory, "utf-8");
  const template = handlebars.compile(fileRead);
  const htmlToSend = template({ username: req.body.userName, password: token }); // Send the plain token

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS (not SSL), set to false
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Optional, but recommended for testing in development
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Signup Successfully",
    html: htmlToSend,
  };

  try {
    // Send the signup email
    await transporter.sendMail(mailOptions);
    
    // If email sent successfully, save the user data
    const user = new userModel({
      userName,
      email,
      password: hashedToken,
    });

    await user.save(); // Save the user data

    return res.status(201).send({ 
      message: "Successfully registered" ,
      token
    });
  } catch (err) {
    console.error(err);
    // Handle the case where email could not be sent
    return res.status(500).send({ message: "Error occurred during registration or sending email" });
  }
});

authRoute.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  // Check if both username/email and password are provided
  if (!userName || !password) {
    return res.status(422).send({ message: "Please fill all the details" });
  }

  // Find the user by either userName or email
  const validUser = await userModel.findOne({
    $or: [{ userName: userName }, { email: userName }],
  });

  // If no user is found, return "User not found"
  if (!validUser) {
    return res.status(404).send({ message: "User not found" });
  }

  // Check if the provided password matches the stored hashed password
  const isMatch = await bcrypt.compare(password, validUser.password);

  if (!isMatch) {
    return res.status(401).send({ message: "Invalid Credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign(
    {
      id: validUser._id,
      userName: validUser.userName,
    },
    process.env.JWT_KEY, // Use your secret key from environment variables
    { expiresIn: "2h" } // Token expiration time
  );

  // Respond with login success and JWT token
  res.status(200).send({
    message: "Login successful",
    token
  });
});



module.exports = authRoute;