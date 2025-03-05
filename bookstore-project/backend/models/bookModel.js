const db = require('../db');

async function getBooksByTags(tags = []) {
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
  return rows;
}

async function createBook({ title, seller, description, price, discounted_price }) {
  const [result] = await db.query(
    `INSERT INTO books 
     (title, seller, description, price, discounted_price) 
     VALUES (?, ?, ?, ?, ?)`,
    [title, seller, description, parseFloat(price), discounted_price ? parseFloat(discounted_price) : null]
  );
  return result.insertId;
}

async function deleteBook(id) {
  await db.query('DELETE FROM books WHERE id = ?', [id]);
}

module.exports = { getBooksByTags, createBook, deleteBook };
