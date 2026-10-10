const express = require("express");
const router = express.Router();
const Class_Package = require("../models/Class_Package");

console.log("CLASS_PACKAGE ROUTES LOADED");


/**  you won't stay here.  
 */
function buildClassPackageId(package_category, class_type, number_of_classes) {
    const category = package_category.charAt(0).toUpperCase();
    const type = class_type.charAt(0).toUpperCase();
    const classes = number_of_classes === 1000 ? "U" : number_of_classes;

    return `${category}${type}${classes}`;
}


router.get("/", async (req, res) => {
    try {
        console.log("Finding class_packages....");
        const class_packages = await Class_Package.find();
        console.log("class_packages found:", class_packages.length);
        console.log("class_packages:", class_packages);
        const results = class_packages.map((item) => ({
            ...item.toObject(),
            cost: item.cost.toString() 
        }));

    console.log("class_packages found:", results.length);

    res.json(results);
  
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error finding class_packages:", error);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const class_package = await Class_Package.findOne({
            class_package_id: req.params.id
        });

        if (!class_package) {
            return res.status(404).json({
                message: "Class_Package not found"
            });
        }

        res.json(class_package);

    } catch (error) {
        console.error("Error finding class_package:", error);

        res.status(500).json({
            message: error.message
        });
    }
});
/*
router.post("/", async (req, res) => {
    try {
        const class_package = new Class_Package(req.body);

        const savedClass_Package = await class_package.save();

        res.status(201).json(savedClass_Package);
    } catch (error) {
        console.error("Error creating class_package:", error);

        res.status(400).json({
            message: error.message
        });
    }
});
*/
router.post("/", async (req, res) => {
  try {
    const {                             //ES6 extracting variables from the req.body structure
      package_category,
      class_type,
      number_of_classes
    } = req.body;

    const class_package_id = await buildClassPackageId(
      package_category,
      class_type,
      number_of_classes
    );

    const class_package = new Class_Package({
      ...req.body,
      class_package_id
    });

    const savedClass_Package = await class_package.save();

    res.status(201).json(savedClass_Package);
  } catch (error) {
    console.error("Error creating class_package:", error);

    res.status(400).json({
      message: error.message
    });
  }
});

router.put("/:class_package_id", async (req, res) => {
    try {
        console.log("Updating class_package:", req.params.class_package_id);
        console.log("New data:", req.body);

        const updatedClass_Package = await Class_Package.findOneAndUpdate(
            { class_package_id: req.params.class_package_id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedClass_Package) {
            return res.status(404).json({
                message: "Class_Package not found"
            });
        }

        res.json(updatedClass_Package);

    } catch (error) {
        console.error("Error updating class_package:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/:class_package_id", async (req, res) => {               //not used but left here in case we need it later.  
    try {                                                               //disable uses update route since we may want to offer
                                                                        //packages seasonally
        const deletedClass_Package = await Class_Package.findOneAndDelete({
            class_package_id: req.params.class_package_id
        });

        if (!deletedClass_Package) {
            return res.status(404).json({
                message: "Class_Package not found"
            });
        }

        res.json({
            message: "Class_Package deleted successfully",
            class_package: deletedClass_Package
        });

    } catch (error) {
        console.error("Error deleting class_package:", error);

        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;