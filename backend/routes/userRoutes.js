const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:id", (req, res) => {
    res.json({ message: `Get user ${req.params.id}` });
});

router.post("/", (req, res) => {
    res.json({ message: "Create user" });
});

module.exports = router;

