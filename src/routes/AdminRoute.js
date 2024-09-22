// routes/admin.route.js
const express = require('express');
const router = express.Router();
const { getAllLeaveRequests, getEmployeeLeavesAndSalary, addEmployee, removeEmployee, updateEmployee, approveOrRejectLeave } = require('../controllers/AdminController');
const Leaves = require('../models/LeavesModel');
const Employee = require('../models/employeeModel');

router.get('/employees', getEmployeeLeavesAndSalary);
router.get('/leaves', getAllLeaveRequests);
router.post('/employees', addEmployee); // **Add Employee**
router.put('/employees/:id', updateEmployee); // **Update Employee**
router.delete('/employees/:id', removeEmployee);

router.put('/leaves/:id', approveOrRejectLeave);

// Analytics endpoint
router.get('/analytics', async (req, res) => {
    try {
        // Fetch total leaves taken by each employee
        const leaves = await Leaves.aggregate([
            {
                $group: {
                    _id: '$employeeId',
                    totalLeaves: { $sum: 1 },
                },
            },
        ]);

        // Fetch employee details
        const employeeData = await Employee.find({});

        // Prepare data for analytics
        const labels = employeeData.map(employee => `${employee.firstName} ${employee.lastName}`);
        const data = labels.map(label => {
            const leave = leaves.find(l => l._id.toString() === employeeData.find(emp => `${emp.firstName} ${emp.lastName}` === label)._id.toString());
            return leave ? leave.totalLeaves : 0;
        });

        res.json({ labels, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching analytics data' });
    }
});


module.exports = router;
