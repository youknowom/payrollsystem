// controllers/employeeAuthController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EmployeeAuth from "../models/EmployeeAuth.js";

// Token generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  const existing = await EmployeeAuth.findOne({ email });
  if (existing)
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await EmployeeAuth.create({ name, email, password: hashed });

  const token = generateToken(user._id);
  res.status(201).json({ success: true, token });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await EmployeeAuth.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const token = generateToken(user._id);
  res.json({ success: true, token });
};

// Get Current User
export const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};
