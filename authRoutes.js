const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs'); // Library to hash passwords safely
const jwt = require('jsonwebtoken'); // Token library for session management

const JWT_SECRET = process.env.JWT_SECRET || 'devops_capstone_super_secret_key';

// Helper to get collection reference
async function getUserCollection() {
    const db = await connectToDatabase();
    return db.collection('users');
}

// 1. POST Route: Register a new user
// Endpoint: /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const usersCollection = await getUserCollection();

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };

        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// 2. POST Route: Authenticate / Login user
// Endpoint: /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usersCollection = await getUserCollection();

        // Verify user existence
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Verify password validity
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// 3. PUT Route: Update user profile information
// Endpoint: /api/auth/update/:id
router.put('/update/:id', async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.params.id;
        const usersCollection = await getUserCollection();

        // Find and update fields selectively
        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;

        const result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user details' });
    }
});

module.exports = router;
