const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET /api/images/check
router.get('/check', bookController.checkImages);

module.exports = router;
