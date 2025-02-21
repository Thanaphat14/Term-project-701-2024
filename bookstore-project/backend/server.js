const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const db = require('./db');
const path = require('path');

app.use(express.json());

app.use('/api/books', (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        const { image } = req.body;
        if (image && !/^[a-z0-9._-]+\.(jpg|jpeg|png)$/i.test(image)) {
            return res.status(400).json({ error: 'Invalid image filename format' });
        }
    }
    next();
});

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

        let queryParams = [];

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
            queryParams.push(tags, tags.length);
        }

        const [rows] = await db.query(query, queryParams);

        // Process image URLs
        const booksWithImages = rows.map(book => {
            let imageUrl = null;
            
            if (book.image) {
                const cleanFilename = book.image.replace(/^.*[\\\/]/, '').replace(/[^a-zA-Z0-9._-]/g, '');
                imageUrl = `/images/${cleanFilename.toLowerCase()}`;  
            }

            return {
                ...book,
                image: imageUrl,
                price: parseFloat(book.price),
                discounted_price: book.discounted_price ? parseFloat(book.discounted_price) : null
            };
        });

        res.json(booksWithImages);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ 
            error: 'Failed to fetch books',
            details: process.env.NODE_ENV === 'development' ? err.message : null
        });
    }
});

app.get('/api/images/check', async (req, res) => {
    try {
        const [books] = await db.query('SELECT image FROM books');
        const missing = await Promise.all(
            books.map(async (book) => {
                const filename = `public/images/${book.image}`;
                const exists = await fs.promises.access(filename)
                    .then(() => true)
                    .catch(() => false);
                return exists ? null : book.image;
            })
        );
        
        res.json({
            totalImages: books.length,
            missingImages: missing.filter(Boolean),
            existingImages: books.length - missing.filter(Boolean).length
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new book
app.post('/api/books', async (req, res) => {
    try {
        const { title, seller, description, price, discounted_price } = req.body;
        
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

app.use('/images', express.static('public/images'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));