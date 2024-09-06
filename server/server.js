const express = require('express');
const app = require('./app');
const userRoutes = require('./router/userRoutes'); // Adjust the path as necessary

// Middleware to parse JSON
app.use(express.json());

// Use the user routes
app.use('/api', userRoutes); // Prefix all routes with /api
  

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
