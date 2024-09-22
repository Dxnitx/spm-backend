// controllers/leave.controller.js
const Leaves = require('../models/LeavesModel');
const Employee = require('../models/employeeModel');

// Employee requests a leave
exports.requestLeave = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const { startDate, endDate, reason } = req.body;
    const totalDays = (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24) + 1;

    if (employee.remainingLeaves < totalDays) {
      return res.status(400).json({ message: 'Not enough leaves remaining' });
    }

    const leaveRequest = new Leaves({
      employeeId: req.params.id,
      startDate,
      endDate,
      reason
    });

    await leaveRequest.save();

    employee.totalLeavesTaken += totalDays;
    employee.remainingLeaves -= totalDays;
    await employee.save();

    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
