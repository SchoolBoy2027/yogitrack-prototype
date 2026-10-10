const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

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
router.post("/", async (req, res) => {
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