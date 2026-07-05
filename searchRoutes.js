const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./db');

// GET Route: Search and filter items
// Endpoint: /api/search
router.get('/', async (req, res) => {
    try {
        // Connect to the database and get the collection
        const db = await connectToDatabase();
        const collection = db.collection('secondChanceItems');

        // Initialize an empty query object
        let query = {};

        // Task 6 Requirement: Check if category query parameter exists and filter on it
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Fetch filtered items from the database
        const searchResults = await collection.find(query).toArray();

        // Return the results
        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Search operation failed:', error);
        res.status(500).json({ error: 'Internal server error during search' });
    }
});

module.exports = router;
