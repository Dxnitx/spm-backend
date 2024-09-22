// models/employee.model.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  dateOfJoining: { type: Date, default: Date.now },
  totalLeavesTaken: { type: Number, default: 0 },
  remainingLeaves: { type: Number, default: 45 }, // Total yearly leaves
  salaryPerDay: { type: Number, default: 2000 }, // Salary per day
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports  = Employee