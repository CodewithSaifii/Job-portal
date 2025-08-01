const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, deleteJob } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

// Public
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected
router.post('/', authMiddleware, createJob);
router.delete('/:id', authMiddleware, deleteJob);

module.exports = router;
