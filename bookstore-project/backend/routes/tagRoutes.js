const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// GET /api/tags
router.get('/', tagController.getTags);

// POST /api/tags
router.post('/', tagController.addTag);

// DELETE /api/tags/:id
router.delete('/:id', tagController.deleteTag);

module.exports = router;
