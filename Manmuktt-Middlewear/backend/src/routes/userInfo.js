const dotenv = require("dotenv");
dotenv.config();
const Router = require("express");
const infoRoute = Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const userInfoModal = require("../models/userInfo.js");
const ObjectId = mongoose.Types.ObjectId;

infoRoute.post("/", async (req, res) => {
  const existingUser = await userInfoModal.findOne({ userId: req.body.userId });
  console.log(existingUser,"existingUser")
  const { userId, name, ageRange, gender } = req.body;

  if (existingUser) {
    return res.send({ message: "user info already registered" });
  }

  const userInfo = new userInfoModal({
    userId,
    name,
    ageRange,
    gender
  });

  userInfo.save();

  res.status(201).json({ message: "User info successfully registered"});
});

infoRoute.get("/:id", async (req, res) => {
    try {
      // Extract the id from the request parameters
      const { id } = req.params;
  
      // Find the user in the database using the provided ID
      const userInfo = await userInfoModal.findOne({ userId: id });
  
      if (!userInfo) {
        return res.status(404).json({ message: "User info not found" });
      }
  
      // Send back the user details if found
      res.status(200).json({
        message: "userInfo successful",
        userInfo: userInfo
    });
    } catch (error) {
      // Handle any errors during the database query or request
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

module.exports = infoRoute;
