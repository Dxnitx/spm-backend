// controllers/admin.controller.js
// const Employee = require('../models/employeeModel');
const Employee = require('../models/employeeModel');
const Leaves = require('../models/LeavesModel');

// Get all employees with leaves and salary details
exports.getEmployeeLeavesAndSalary = async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get all leave requests
  exports.getAllLeaveRequests = async (req, res) => {
    try {
      const leaveRequests = await Leaves.find().populate('employeeId');
      res.json(leaveRequests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // **1. Add Employee**: Admin adds a new employee
  exports.addEmployee = async (req, res) => {
    try {
      const newEmployee = new Employee(req.body);
      await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // **2. Remove Employee**: Admin removes an employee
  exports.removeEmployee = async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
  
      // Optionally, delete all leave requests related to this employee
      await Leaves.deleteMany({ employeeId: req.params.id });
  
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // **3. Update Employee**: Admin updates employee details
  exports.updateEmployee = async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
  
      res.json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Function to approve or reject leave requests
exports.approveOrRejectLeave = async (req, res) => {
  try {
    const leaveRequest = await Leaves.findById(req.params.id);
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Update leave status to "Approved" or "Rejected"
    leaveRequest.status = req.body.status;
    await leaveRequest.save();

    // If approved, increment the employee's total leaves taken
    if (req.body.status === 'Approved') {
      const employee = await Employee.findById(leaveRequest.employeeId);
      if (employee) {
        employee.totalLeavesTaken += 1;
        await employee.save();
      }
    }

    res.json({ message: `Leave ${req.body.status.toLowerCase()} successfully`, leaveRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};