const tagModel = require('../models/tagModel');

async function getTags(req, res) {
  try {
    const tags = await tagModel.getAllTags();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addTag(req, res) {
  try {
    const { name } = req.body;
    const id = await tagModel.createTag(name);
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTag(req, res) {
  try {
    const id = req.params.id;
    await tagModel.deleteTag(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getTags, addTag, deleteTag };
