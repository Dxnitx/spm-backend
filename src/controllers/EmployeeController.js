// controllers/employee.controller.js
const Employee = require('../models/employeeModel');

// Get Employee Profile
exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Employee Profile
exports.updateEmployeeProfile = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Current Salary
exports.getCurrentSalary = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const currentSalary = employee.salaryPerDay * (365 - employee.remainingLeaves);
    res.json({ salary: currentSalary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
