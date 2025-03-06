const db = require('../db');

async function getAllTags() {
  const [rows] = await db.query('SELECT * FROM tags');
  return rows;
}

async function createTag(name) {
  const [result] = await db.query('INSERT INTO tags (name) VALUES (?)', [name]);
  return result.insertId;
}

async function deleteTag(id) {
  await db.query('DELETE FROM tags WHERE id = ?', [id]);
}

module.exports = { getAllTags, createTag, deleteTag };
