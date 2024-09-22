// routes/employee.route.js
const express = require('express');
const router = express.Router();
const { getCurrentSalary, getEmployeeProfile, updateEmployeeProfile } = require('../controllers/EmployeeController');

router.get('/profile/:id', getEmployeeProfile);
router.put('/profile/:id', updateEmployeeProfile);
router.get('/salary/:id', getCurrentSalary);

module.exports = router;
