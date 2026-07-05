const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const secondChanceRoutes = require('./secondChanceItemsRoutes');
const searchRoutes = require('./searchRoutes'); // Import the search routes

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware configuration
app.use(cors());
app.use(express.json());

// Mount baseline item routes
app.use('/api/secondchance', secondChanceRoutes);

// Task 7 Requirement: Route serving /api/secondchance/search
app.use('/api/secondchance/search', searchRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to DB and start the server
connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to start server due to database connection issue:', error);
    });

module.exports = app;
