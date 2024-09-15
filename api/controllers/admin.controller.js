const Employee = require('../models/Employee');
const LeaveRequest = require('../models/LeaveRequest');

const SALARY_PER_DAY = 1500;
const WORK_DAYS_PER_MONTH = 22;

// Add an employee
exports.addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View and manage salaries
exports.calculateAndUpdateSalaries = async (req, res) => {
  try {
    const employees = await Employee.find().populate('leaves');
    
    for (const employee of employees) {
      const leaveCount = await LeaveRequest.countDocuments({ employeeId: employee._id, status: 'Approved' });
      const leaveDays = leaveCount; // Assumes each leave is a full day
      const salary = SALARY_PER_DAY * (WORK_DAYS_PER_MONTH - leaveDays);
      employee.salary = salary;
      await employee.save();
    }

    res.json({ message: 'Salaries updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update salary payment status
exports.updateSalaryPaymentStatus = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { salaryPaid: req.body.salaryPaid }, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
