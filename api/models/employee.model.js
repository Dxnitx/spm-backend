const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  dateOfJoining: { type: Date, required: true },
  leaves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LeaveRequest' }],
  totalLeavesTaken: { type: Number, default: 0 },
  salaryPaid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Employee', employeeSchema);
