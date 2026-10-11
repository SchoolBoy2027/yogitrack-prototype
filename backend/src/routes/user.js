const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const BLogic = require("../library/BLogic");

console.log("USER ROUTES LOADED");

// Generate a 5-character user ID based on role
async function generateUserId(role) {
  let prefix;

  switch (role) {
    case "Manager":
      prefix = "M";
      break;

    case "Instructor":
      prefix = "I";
      break;

    default:
      throw new Error(
        "Invalid role. Must be Manager or Instructor."
      );
  }

  // Count only users with this role
  const userCount = await User.countDocuments({
    role: role
  });

  // Next number for this role
  const nextNumber = userCount + 1;

  // Convert to 4 digits
  const numberPart = String(nextNumber).padStart(4, "0");

  // Return 5-character ID
  return prefix + numberPart;
}


router.get("/", async (req, res) => {
    try {
        console.log("Finding users....");
        //remove the password and -mustChangePassword field
        const users = await User.find().select("-password -mustChangePassword");
        console.log("Users found:", users.length);
        console.log("Users:", users);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error finding users:", error);
    }
});

// GET all instructors  keep this ahead of /:id to avoid issues.  
router.get("/instructors", async (req, res) => {
  try {
    //remove the password and -mustChangePassword field
    const instructors = await User.find({ role: "Instructor" }).select("-password -mustChangePassword");

    res.json(instructors);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all managers
router.get("/managers", async (req, res) => {
  try {
     //remove the password and -mustChangePassword field
   const managers = await User.find({role: "Manager"}).select("-password -mustChangePassword");

    res.json(managers);
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


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
/* original
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
*/

router.post("/", async (req, res) => {
    try {
        const { role } = req.body;

        // Generate the user_id based on the user's role
        const user_id = await generateUserId(role);

        // Create the user with the generated ID
        const user = new User({
            ...req.body,                        // copy submitted fields, spread operator
            user_id: user_id                    // generate the ID
        });

        const savedUser = await user.save();

        res.status(201).json(savedUser);

    } catch (error) {
        console.error("Error creating user:", error);

        res.status(400).json({
            message: error.message
        });
    }
});


router.put("/:user_id", async (req, res) => {
    try {
        console.log("Updating user:", req.params.user_id);
        console.log("New data:", req.body);

        const updatedUser = await User.findOneAndUpdate(
            { user_id: req.params.user_id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(updatedUser);

    } catch (error) {
        console.error("Error updating user:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/:user_id", async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({
            user_id: req.params.user_id
        });

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully",
            user: deletedUser
        });

    } catch (error) {
        console.error("Error deleting user:", error);

        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;