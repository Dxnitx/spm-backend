// routes/admin.route.js
const express = require('express');
const router = express.Router();
const { getAllLeaveRequests, getEmployeeLeavesAndSalary, addEmployee, removeEmployee, updateEmployee, approveOrRejectLeave } = require('../controllers/AdminController');

router.get('/employees', getEmployeeLeavesAndSalary);
router.get('/leaves', getAllLeaveRequests);
router.post('/employees', addEmployee); // **Add Employee**
router.put('/employees/:id', updateEmployee); // **Update Employee**
router.delete('/employees/:id', removeEmployee);

router.put('/leaves/:id', approveOrRejectLeave);

module.exports = router;
