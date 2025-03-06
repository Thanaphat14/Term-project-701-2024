const db = require('../db');
exports.showLogin = (req, res) => {
    if (req.session.user) {
        return res.redirect('/admin/dashboard');
    }
    res.render('admin-login', { error: null });
};

exports.createAdmin = async (req, res) => {
    const { username, password, email } = req.body;

    await db.query('INSERT INTO admins (username, password, email) VALUES (?, ?, ?)', 
        [username, password, email]);

    res.send('Admin created successfully!');
};
exports.handleLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch admin user from DB
        const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

        console.log("Database Query Result:", rows);

        if (rows.length === 0) {
            console.log("User not found.");
            return res.render('admin-login', { error: 'Invalid credentials!' });
        }

        // Extract user data properly
        const admin = rows[0];

        console.log("Stored Password:", admin.password);
        console.log("Entered Password:", password);

        // Compare passwords directly (not recommended, but per your request)
        if (password !== admin.password) {
            console.log("Password mismatch.");
            return res.render('admin-login', { error: 'Invalid credentials!' });
        }

        // Store user in session
        req.session.user = { id: admin.id, username: admin.username, email: admin.email };

        console.log("Login successful!");
        return res.redirect('/admin/dashboard');
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.showDashboard = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/admin'); 
    }
    res.render('admin-dashboard', { user: req.session.user });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin'); 
    });
};
