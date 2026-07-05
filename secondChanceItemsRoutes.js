const express = require('express');
const multer = require('multer');
const router = express.Router();
const { connectToDatabase } = require('./db'); // Import database connection
const { ObjectId } = require('mongodb');

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper to get collection reference
async function getCollection() {
    const db = await connectToDatabase();
    return db.collection('secondChanceItems');
}

// 1. GET Route: Fetch all items
// Endpoint: /api/secondchance/items
router.get('/items', async (req, res) => {
    try {
        const collection = await getCollection();
        const items = await collection.find({}).toArray();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// 2. GET Route: Fetch a single item by ID
// Endpoint: /api/secondchance/items/:id
router.get('/items/:id', async (req, res) => {
    try {
        const collection = await getCollection();
        const item = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

// 3. POST Route: Add a new item with file upload
// Endpoint: /api/secondchance/items
router.post('/items', upload.single('file'), async (req, res) => {
    try {
        const collection = await getCollection();
        
        const newItem = {
            name: req.body.name,
            category: req.body.category,
            condition: req.body.condition,
            description: req.body.description,
            imageUrl: req.file ? `uploads/${req.file.originalname}` : null, // Handled file metadata
            createdAt: new Date()
        };

        const result = await collection.insertOne(newItem);
        res.status(201).json({ message: 'Item created successfully', itemId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// 4. DELETE Route: Remove an item by ID
// Endpoint: /api/secondchance/items/:id
router.delete('/items/:id', async (req, res) => {
    try {
        const collection = await getCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
