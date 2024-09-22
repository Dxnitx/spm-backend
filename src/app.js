// app.js
const express = require('express');
const cors =  require('cors')
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/EmployeeRoute');
const leaveRoutes = require('./routes/LeavesRoute');
const adminRoutes = require('./routes/AdminRoute');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/admin', adminRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
