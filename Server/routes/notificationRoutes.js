const express = require('express');
const router = express.Router();
const {
  createNotification,
  getUserNotifications,
  markAllAsRead
} = require('../controllers/notificationController');

const authMiddleware = require('../middleware/authMiddleware');

// Admin or backend calls
router.post('/', createNotification);

// Authenticated user can fetch his notifications
router.get('/', authMiddleware, getUserNotifications);
router.put('/mark-read', authMiddleware, markAllAsRead);

module.exports = router;
