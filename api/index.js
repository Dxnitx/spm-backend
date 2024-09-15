const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employee.route.js');
const leaveRoutes = require('./routes/leaves.route.js');
const adminRoutes = require('./routes/admin.route.js');

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/employee_management', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/employees', employeeRoutes);
app.use('/leaves', leaveRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
