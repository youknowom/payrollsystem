// controllers/adminController.js

import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Generate token
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Admin Login (mock-based, update with real logic if needed)
export const loginAdmin = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Admin name required" });
  }

  try {
    const admin = await Admin.findOne({ name });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const token = generateToken(admin._id.toString());
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
