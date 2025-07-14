// middleware/protect.js
import jwt from "jsonwebtoken";
import EmployeeAuth from "../models/EmployeeAuth.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await EmployeeAuth.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
