const bookModel = require('../models/bookModel');
const path = require('path');

async function getBooks(req, res) {
  try {
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    const rows = await bookModel.getBooksByTags(tags);

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
}

async function checkImages(req, res) {
  const fs = require('fs');
  try {
    // Query images from books table
    const [books] = await require('../db').query('SELECT image FROM books');
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
}

async function addBook(req, res) {
  try {
    const { title, seller, description, price, discounted_price } = req.body;
    if (!title || !seller || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const id = await bookModel.createBook({ title, seller, description, price, discounted_price });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteBook(req, res) {
  try {
    const id = req.params.id;
    await bookModel.deleteBook(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getBooks, checkImages, addBook, deleteBook };
