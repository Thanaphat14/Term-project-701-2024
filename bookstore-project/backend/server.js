const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const db = require('./db');

app.use(express.json());

// Get all books
app.get('/api/books', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM books');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new book
app.post('/api/books', async (req, res) => {
    try {
        const { title, author, price } = req.body;
        const [result] = await db.query(
            'INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
            [title, author, price]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));