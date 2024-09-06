const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();

// Import routes
const userRoutes = require('./router/userRoutes');

// Middleware setup
app.use(cors());
app.use(express.json()); 


app.get('/', (req, res)=>{
      res.end("Server is running");
})


// Route setup
app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    });
});

module.exports = app; 
