const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const BLogic = require("../library/BLogic");

console.log("CUSTOMER ROUTES LOADED");


// Generate a 5-character customer ID 
async function generateCustomerId() {
  const prefix = "C";

  // Count only users with this role
  const customerCount = await Customer.countDocuments();

  // Next number for this role
  const nextNumber = customerCount + 1;

  // Convert to 4 digits
  const numberPart = String(nextNumber).padStart(4, "0");

  // Return 5-character ID
  return prefix + numberPart;
}



router.get("/", async (req, res) => {
  try {
    console.log("Finding customers....");
    const customers = await Customer.find();
    console.log("Customers found:", customers.length);
    console.log("Customers:", customers);
    res.json(customers);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error finding customers:", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findOne({
      customer_id: req.params.id
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.json(customer);

  } catch (error) {
    console.error("Error finding customer:", error);

    res.status(500).json({
      message: error.message
    });
  }
});
//post is Insert
router.post("/", async (req, res) => {
  try {

    const customer_id = await generateCustomerId();

    // Create the user with the generated ID
    const customer = new Customer({
      ...req.body,                                  // copy submitted fields, spread operator
      customer_id: customer_id                    // generate the ID
    });


    const savedCustomer = await customer.save();

    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);

    res.status(400).json({
      message: error.message
    });
  }
});

//update
router.put("/:customer_id", async (req, res) => {
  try {
    console.log("Updating customer:", req.params.customer_id);
    console.log("New data:", req.body);

    const updatedCustomer = await Customer.findOneAndUpdate(
      { customer_id: req.params.customer_id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.json(updatedCustomer);

  } catch (error) {
    console.error("Error updating customer:", error);

    res.status(500).json({
      message: error.message
    });
  }
});
//delete
router.delete("/:customer_id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({
      customer_id: req.params.customer_id
    });

    if (!deletedCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.json({
      message: "Customer deleted successfully",
      customer: deletedCustomer
    });

  } catch (error) {
    console.error("Error deleting customer:", error);

    res.status(500).json({
      message: error.message
    });
  }
});
module.exports = router;