const Employee = require("../models/Employee");

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// Add a new employee
const addEmployee = async (req, res) => {
  try {
    const {
      eid,
      fname,
      lname,
      email,
      contact,
      department,
      joiningdate,
      emptype,
      salary,
    } = req.body;

    const newEmployee = new Employee({
      eid,
      fname,
      lname,
      email,
      contact,
      department,
      joiningdate,
      emptype,
      salary,
    });

    const employeeData = await newEmployee.save();
    res.status(201).json({ msg: "Employee added successfully", employeeData });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error adding employee", error });
  }
};

// Get an employee by ID
const findEmployeeByID = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Employee.findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching employee", error });
  }
};

// Update an employee by ID
const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      eid,
      fname,
      lname,
      email,
      contact,
      department,
      joiningdate,
      emptype,
      salary,
    } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          eid,
          fname,
          lname,
          email,
          contact,
          department,
          joiningdate,
          emptype,
          salary,
        },
      },
      { new: true }
    );

    if (updatedEmployee) {
      res.status(200).json({ msg: "Employee updated", updatedEmployee });
    } else {
      res.status(404).json({ msg: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating employee", error });
  }
};

// Delete an employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Employee.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.status(200).json({ msg: "Employee deleted successfully" });
    } else {
      res.status(404).json({ msg: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error deleting employee", error });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  findEmployeeByID,
  updateEmployee,
  deleteEmployee,
};
