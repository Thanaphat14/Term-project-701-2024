-- Create tables
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    seller VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    discounted_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table with proper cascade deletion
CREATE TABLE IF NOT EXISTS book_tags (
    book_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (book_id, tag_id),
    FOREIGN KEY (book_id) 
        REFERENCES books(id) 
        ON DELETE CASCADE,
    FOREIGN KEY (tag_id) 
        REFERENCES tags(id) 
        ON DELETE CASCADE
);

-- Sample datas
-- Books
INSERT INTO books (title, seller, description, image, price, discounted_price) VALUES
('The Great Gatsby', 'ClassicBooks Co.', 'A story of the Jazz Age', '1.jpg', 24.99, 19.99),
('Python for Beginners', 'TechBooks Ltd', 'Learn Python programming', '2.jpg', 39.99, NULL),
('Master Chef Recipes', 'Foodie Publications', 'Culinary delights for home chefs', '3.jpg', 29.99, 24.99),
('The Hobbit', 'Fantasy Books Inc', 'Epic fantasy adventure', '4.png', 29.99, 24.99),
('The Martian', 'Sci-Fi Books Co', 'Survival story on Mars', '5.jpg', 27.95, NULL),
('Becoming', 'Memoir Press', 'Michelle Obama autobiography', '6.jpg', 35.00, 29.99),
('Atomic Habits', 'SelfHelp Publications', 'Build good habits framework', '7.jpg', 28.50, NULL),
('The Da Vinci Code', 'Mystery House', 'Religious conspiracy thriller', '8.jpg', 19.99, 15.99),
('1984', 'ClassicBooks Co', 'Dystopian political novel', '9.jpg', 22.50, 18.75),
('The Lean Startup', 'Business Books Ltd', 'Entrepreneurship methodology', '10.jpg', 34.99, 29.99);


-- Tags
INSERT INTO tags (name) VALUES
('Fiction'), ('Classic'), ('Programming'), ('Hot Deal'), ('Cooking'), ('Bestseller'),
('Mystery'), ('Science Fiction'), ('Non-Fiction'), ('Self-Help'), ('Business'),
('Fantasy'), ('Thriller'), ('Dystopian'), ('Memoir'), ('Technology'), ('Entrepreneurship'), ('Adventure');

-- Book-Tag relationships
INSERT INTO book_tags (book_id, tag_id) VALUES
-- The Great Gatsby (3 tags)
(1, 1), (1, 2), (1, 6),
-- Python for Beginners (3 tags)
(2, 3), (2, 4), (2, 16),
-- Master Chef Recipes (3 tags)
(3, 5), (3, 6), (3, 4),
-- The Hobbit (3 tags)
(4, 6), (4, 12), (4, 18),
-- The Martian (3 tags)
(5, 8), (5, 18), (5, 6),
-- Becoming (3 tags)
(6, 15), (6, 9), (6, 6),
-- Atomic Habits (3 tags)
(7, 10), (7, 9), (7, 6),
-- The Da Vinci Code (3 tags)
(8, 7), (8, 13), (8, 6),
-- 1984 (3 tags)
(9, 1), (9, 2), (9, 14),
-- The Lean Startup (3 tags)
(10, 11), (10, 17), (10, 6);

-- Admin
INSERT INTO admins (username, password, email) VALUES
('admin', '123', 'admin@gmail.com');