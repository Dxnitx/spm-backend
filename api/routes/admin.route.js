const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller.js');

// Employee management routes
router.post('/employees', adminController.addEmployee);
router.put('/employees/:id', adminController.updateEmployee);

// Salary management routes
router.post('/calculate-salaries', adminController.calculateAndUpdateSalaries);
router.put('/salaries/:id', adminController.updateSalaryPaymentStatus);

module.exports = router;
