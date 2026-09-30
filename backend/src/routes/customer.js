const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

console.log("CUSTOMER ROUTES LOADED");

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

router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);

    const savedCustomer = await customer.save();

    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);

    res.status(400).json({
      message: error.message
    });
  }
});

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