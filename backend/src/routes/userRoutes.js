import express from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const router = express.Router();

/**
 * Register a new user.
 * Hashes the password before storing it in the database.
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

        // Insert the new user into the database
        db.query(query, [username, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Username already exists' });
                }
                console.error('Database error during registration:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Error hashing password', error });
    }
});

/**
 * Login a user.
 * Verifies the username and password and returns a success message if valid.
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    // Fetch the user from the database
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Database error during login:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', userId: user.id });
    });
});

export default router;