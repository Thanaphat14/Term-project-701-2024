const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

const adminRoutes = require('./routes/adminRoutes');
const bookRoutes = require('./routes/bookRoutes');
const tagRoutes = require('./routes/tagRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "admin-frontend/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//session
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false 
    }
}));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/tags', tagRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
