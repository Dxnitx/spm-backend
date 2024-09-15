const Employee = require('../models/Employee');
const LeaveRequest = require('../models/LeaveRequest');

// View employee profile
exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).populate('leaves');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const leaveRequests = await LeaveRequest.find({ employeeId: req.user.id });

    res.json({
      profile: employee,
      leavesTaken: leaveRequests,
      totalLeavesTaken: employee.totalLeavesTaken,
      message: leaveRequests.length ? null : 'No leaves available'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View current salary
exports.getCurrentSalary = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    res.json({ salary: employee.salary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
