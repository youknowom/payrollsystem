import express from "express";
import multer from "multer";
import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Employee from "../models/Employee.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Add Employee
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, phone, address, dob } = req.body;
    let imageUrl = "";

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      const uploadedImage = await imagekit.upload({
        file: fileBuffer,
        fileName: `${Date.now()}-${req.file.originalname}`,
      });
      fs.unlinkSync(req.file.path);
      imageUrl = uploadedImage.url;
    }

    const newEmployee = new Employee({
      name,
      phone,
      address,
      dob,
      image: imageUrl,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error("Error creating employee:", err.message);
    res
      .status(500)
      .json({ message: "Error adding employee", error: err.message });
  }
});

// ✅ Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
});

// ✅ Delete Employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Employee.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    console.error("Error deleting employee:", err.message);
    res.status(500).json({ message: "Error deleting employee" });
  }
});

// ✅ Update Employee by ID (NEWLY ADDED)
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err.message);
    res.status(500).json({ message: "Error updating employee" });
  }
});

export default router;
