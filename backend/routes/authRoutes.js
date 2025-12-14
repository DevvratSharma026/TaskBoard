// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, async (req, res) => {
  const User = require('../models/User');
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
