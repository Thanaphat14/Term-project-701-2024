const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Middleware: validate image filename for POST/PUT methods
router.use((req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const { image } = req.body;
    if (image && !/^[a-z0-9._-]+\.(jpg|jpeg|png)$/i.test(image)) {
      return res.status(400).json({ error: 'Invalid image filename format' });
    }
  }
  next();
});

// GET /api/books
router.get('/', bookController.getBooks);

// POST /api/books
router.post('/', bookController.addBook);

// DELETE /api/books/:id
router.delete('/:id', bookController.deleteBook);

module.exports = router;
