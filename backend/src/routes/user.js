const express = require("express");
const router = express.Router();
const User = require("../models/User");

console.log("USER ROUTES LOADED");

router.get("/", async (req, res) => {
   try {
      console.log("Finding users....");
      const users = await User.find();
      console.log("Users found:", users.length);
      console.log("Users:", users);
      res.json(users);
   }
   catch (error) {
      res.status(500).json({ message: error.message });
      console.error("Error finding users:", error);
   }
});
/*
router.get("/:id", async (req, res) => {
   try {
      const user = await User.fint.findById(req.params.id);
      res.json(user);
   }
   catch (error) {
      res.status(500).json({ message: error.message });
          console.error("Error finding users:", error);
   }
});
*/


router.get("/:id", async (req, res) => {
    try {
        const user = await User.findOne({
            user_id: req.params.id
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        console.error("Error finding user:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);

        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);

        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;