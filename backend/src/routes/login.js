
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

console.log("LOGIN ROUTES LOADED");
// LOGIN

router.post("/", async (req, res) => {

    try {

        const {
            user_id,
            password
        } = req.body;


        // Check required fields

        if (!user_id || !password) {
            console.log("Soemthing blank.", "User ID and password are required.");
            return res.status(400).json({
                message: "User ID and password are required."
            });
        }


        // Find user

        const user = await User.findOne({
            user_id: user_id
        });


        // Do not reveal whether the user exists

        if (!user) {
            console.log('user not found!', user_id);
            return res.status(401).json({
                message: "Invalid user ID or password."
            });
        }else{
            console.log('user found!');
        }


        // Compare supplied password + pepper with bcrypt hash

        const passwordWithPepper =
            password + process.env.PASSWORD_PEPPER;

        const passwordMatch = await bcrypt.compare(
            passwordWithPepper,
            user.password
        );



        if (!passwordMatch) {
            console.log("Invalid user ID or password.");

            return res.status(401).json({
                message: "Invalid user ID or password."
            });
        }


        // Successful login
        console.log("Login successful");
        res.json({

            message: "Login successful",

            mustChangePassword: user.mustChangePassword,

            user: {
                user_id: user.user_id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }

        });


    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error."
        });
    }
});


// ==========================================================
// CHANGE PASSWORD
// ==========================================================

router.post("/change-password", async (req, res) => {

    try {

        const {
            user_id,
            currentPassword,
            newPassword
        } = req.body;


        // Check required fields

        if (
            !user_id ||
            !currentPassword ||
            !newPassword
        ) {

            return res.status(400).json({
                message: "All password fields are required."
            });
        }


        // Password length

        if (newPassword.length < 8) {

            return res.status(400).json({
                message: "New password must be at least 8 characters."
            });
        }


        // Find user

        const user = await User.findOne({
            user_id: user_id
        });


        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });
        }


        // Verify current password
        console.log("current password=" + currentPassword);
        console.log("user password=" + user.password);

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!passwordMatch) {

            return res.status(401).json({
                message: "Current password is incorrect."
            });
        }


        // Make sure new password is different

        const samePassword = await bcrypt.compare(
            newPassword,
            user.password
        );


        if (samePassword) {

            return res.status(400).json({
                message:
                    "New password must be different from the current password."
            });
        }

        const passwordWithPepper =
            newPassword + process.env.PASSWORD_PEPPER;

        const hashedPassword = await bcrypt.hash(
            passwordWithPepper,
            12
        );


        // Update user

        user.password = hashedPassword;

        user.mustChangePassword = false;

        await user.save();


        res.json({
            message: "Password changed successfully."
        });


    } catch (error) {

        console.error("Change password error:", error);

        res.status(500).json({
            message: "Server error."
        });
    }
});


module.exports = router;

