const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories
} = require('../controllers/categoryContrioller');

const authMiddleware = require('../middleware/authMiddleware');

// Only admin or employer can create category — here just auth check for now
router.post('/', authMiddleware, createCategory);
router.get('/', getCategories);

module.exports = router;
