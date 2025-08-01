const express = require('express');
const router = express.Router();
const { createCompany, getAllCompanies, getCompanyById } = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createCompany);

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);

module.exports = router;
