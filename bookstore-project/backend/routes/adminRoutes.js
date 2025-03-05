const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.showLogin);
router.post('/login', adminController.handleLogin);
router.get('/dashboard', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/admin');
    }
    next();
}, adminController.showDashboard);
router.get('/logout', adminController.logout);

module.exports = router;
