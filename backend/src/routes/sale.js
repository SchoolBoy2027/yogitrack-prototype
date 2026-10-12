const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const BLogic = require("../library/BLogic");
const mongoose = require("mongoose");
const Customer = require("../models/Customer");
const ClassPackage = require("../models/Class_Package");


console.log("SALES ROUTES LOADED");

// Generate a 5-character user ID based on role
async function generateSaleId() {
    const year = new Date().getFullYear();

    const count = await Sale.countDocuments({
        sale_id: {
            $gte: year * 1000000,
            $lt: (year + 1) * 1000000
        }
    });

    const sale_id = year * 1000000 + count + 1;
  return await sale_id;
}

router.get("/", async (req, res) => {
    try {
        console.log("Finding sales....");
        const sales = await Sale.find();
        console.log("Sales found:", sales.length);
        console.log("Sales:", sales);
             const formattedSales = sales.map((sale) => ({
            ...sale.toObject(),
            price_paid: sale.price_paid.toString()
        }));

        res.json(formattedSales);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error finding sales:", error);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const sale = await Sale.findOne({
            sale_id: req.params.id
        });

        if (!sale) {
            return res.status(404).json({
                message: "Sale not found"
            });
        }

        res.json(sale);

    } catch (error) {
        console.error("Error finding sale:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

//Add get new ID.
/*router.post("/", async (req, res) => {
    try {

        const sale_id = await generateSaleId();

        const sale = new Sale({
            ...req.body,
            sale_id,
            package_id: req.body.package_id,
            price_paid: String(req.body.price_paid).replace(/[$,]/g, "")
        });

        const savedSale = await sale.save();

        res.status(201).json(savedSale);
    } catch (error) {
        console.error("Error creating sale:", error);

        res.status(400).json({
            message: error.message
        });
    }
});
*/
router.post("/", async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const customer = await Customer.findOne({
            customer_id: req.body.customer_id
        }).session(session);

        if (!customer) {
            throw new Error("Customer not found.");
        }

        const purchasedPackage = await ClassPackage.findOne({
            class_package_id: req.body.package_id
        }).session(session);

        if (!purchasedPackage) {
            throw new Error("Package not found.");
        }

        const sale_id = await generateSaleId();

        const sale = new Sale({
            ...req.body,
            sale_id,
            class_package_id: req.body.package_id,
            price_paid: String(req.body.price_paid).replace(/[$,]/g, "")
        });

        const savedSale = await sale.save({ session });

        customer.packages_purchased.push(purchasedPackage._id);
        customer.start_date = req.body.start_date;
        customer.end_date = req.body.end_date;
        customer.yoga_class_type = req.body.yoga_class_type;
        customer.balance += Number(req.body.number_of_classes);

        await customer.save({ session });

        await session.commitTransaction();

        res.status(201).json(savedSale);
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        console.error("Error creating sale:", error);

        res.status(400).json({
            message: error.message
        });
    } finally {
        await session.endSession();
    }
});

router.put("/:sale_id", async (req, res) => {
    try {
        console.log("Updating sale:", req.params.sale_id);
        console.log("New data:", req.body);

        const updatedSale = await Sale.findOneAndUpdate(
            { sale_id: req.params.sale_id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedSale) {
            return res.status(404).json({
                message: "Sale not found"
            });
        }

        res.json(updatedSale);

    } catch (error) {
        console.error("Error updating sale:", error);

        res.status(500).json({
            message: error.message
        });
    }
});
router.delete("/:sale_id", async (req, res) => {
    try {
        const deletedSale = await Sale.findOneAndDelete({
            sale_id: req.params.sale_id
        });

        if (!deletedSale) {
            return res.status(404).json({
                message: "Sale not found"
            });
        }

        res.json({
            message: "Sale deleted successfully",
            sale: deletedSale
        });

    } catch (error) {
        console.error("Error deleting sale:", error);

        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;