// routes/employee.route.js
const express = require('express');
const router = express.Router();
const { getAllLeaveRequests,getCurrentSalary, getEmployeeProfile, updateEmployeeProfile } = require('../controllers/EmployeeController');

router.get('/profile/:id', getEmployeeProfile);
router.put('/profile/:id', updateEmployeeProfile);
router.get('/salary/:id', getCurrentSalary);
router.get('/request/:employeeId', getAllLeaveRequests);

module.exports = router;
