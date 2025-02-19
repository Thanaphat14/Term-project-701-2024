const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const db = require('./db');

app.use(express.json());

// Get books with optional tag 
app.get('/api/books', async (req, res) => {
    try {
        const tags = req.query.tags ? req.query.tags.split(',') : [];
        
        let query = `
            SELECT b.*, 
            (
                SELECT JSON_ARRAYAGG(name) 
                FROM tags t
                JOIN book_tags bt ON t.id = bt.tag_id
                WHERE bt.book_id = b.id
            ) AS tags
            FROM books b
        `;

        if (tags.length > 0) {
            query += `
                WHERE EXISTS (
                    SELECT 1 FROM book_tags bt
                    JOIN tags t ON bt.tag_id = t.id
                    WHERE bt.book_id = b.id
                    AND t.name IN (?)
                    GROUP BY bt.book_id
                    HAVING COUNT(DISTINCT t.name) = ?
                )
            `;
            const [rows] = await db.query(query, [tags, tags.length]);
            return res.json(rows);
        }

        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new book
app.post('/api/books', async (req, res) => {
    try {
        const { title, seller, description, price, discounted_price } = req.body;
        
        // validation
        if (!title || !seller || !price) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const [result] = await db.query(
            `INSERT INTO books 
            (title, seller, description, price, discounted_price) 
            VALUES (?, ?, ?, ?, ?)`,
            [title, seller, description, parseFloat(price), 
             discounted_price ? parseFloat(discounted_price) : null]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete book
app.delete('/api/books/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM books WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tags
app.get('/api/tags', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tags');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new tag
app.post('/api/tags', async (req, res) => {
    try {
        const { name } = req.body;
        const [result] = await db.query(
            'INSERT INTO tags (name) VALUES (?)',
            [name]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete tag
app.delete('/api/tags/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM tags WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));