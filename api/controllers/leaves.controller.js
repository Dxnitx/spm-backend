const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');

const MAX_LEAVE_COUNT = 45;

// Employee requests a leave
exports.requestLeave = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    // Check total leave count
    const leaveCount = await LeaveRequest.countDocuments();
    if (leaveCount >= MAX_LEAVE_COUNT) {
      return res.status(400).json({ message: 'Leave request limit reached' });
    }

    const leaveRequest = new LeaveRequest({
      ...req.body,
      employeeId: req.user.id
    });
    await leaveRequest.save();
    
    employee.leaves.push(leaveRequest._id);
    employee.totalLeavesTaken += 1; // Increment leave count
    await employee.save();
    
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Apply leave (update status)
exports.applyLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    if (req.body.status === 'Approved') {
      const employee = await Employee.findById(leave.employeeId);
      if (employee) {
        employee.totalLeavesTaken += 1; // Increment leave count
        await employee.save();
      }
    }

    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin views all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find().populate('employeeId');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
