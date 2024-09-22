// routes/leave.route.js
const express = require('express');
const router = express.Router();
const { requestLeave } = require('../controllers/LeavesController');

router.post('/request/:id', requestLeave);

module.exports = router;
