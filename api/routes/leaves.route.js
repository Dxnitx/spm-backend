const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaves.controller.js');

// Employee routes
router.post('/request', leaveController.requestLeave);
router.put('/:id', leaveController.applyLeave);
router.get('/:id', leaveController.getLeaveDetails);

// Admin routes
router.get('/admin', leaveController.getAllLeaveRequests);

module.exports = router;
