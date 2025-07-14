// routes/dashboard.js
import express from "express";
import Employee from "../models/Employee.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    const totalEmployees = employees.length;
    const presentToday = Math.floor(Math.random() * totalEmployees); // simulated
    const absentToday = totalEmployees - presentToday;

    const recentAttendance = employees.slice(0, 5).map((emp) => ({
      empName: emp.name,
      time: "09:" + (10 + Math.floor(Math.random() * 30)) + " AM",
      status: "In",
    }));

    res.json({
      totalEmployees,
      presentToday,
      absentToday,
      totalLeavesPending: 4, // static for now
      recentAttendance,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching dashboard data" });
  }
});

export default router;
