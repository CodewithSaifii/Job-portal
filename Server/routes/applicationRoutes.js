const express = require('express');
const router = express.Router();
const {
  applyToJob,
  getApplicationsForJob,
  getMyApplications
} = require('../controllers/applicationController');

const authMiddleware = require('../middleware/authMiddleware');

// Jobseeker applies to a job
router.post('/apply', authMiddleware, applyToJob);

// Employer sees all applications for their job
router.get('/job/:jobId', authMiddleware, getApplicationsForJob);

// Jobseeker sees all their applications
router.get('/my', authMiddleware, getMyApplications);

module.exports = router;
