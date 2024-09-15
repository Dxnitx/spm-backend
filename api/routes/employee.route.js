const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller.js');

router.get('/profile', employeeController.getEmployeeProfile);
router.get('/salary', employeeController.getCurrentSalary);

module.exports = router;
