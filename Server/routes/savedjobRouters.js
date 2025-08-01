const express = require('express');
const router = express.Router();
const {
  saveJob,
  unsaveJob,
  getSavedJobs
} = require('../controllers/savedjobsController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/:jobId', authMiddleware, saveJob);
router.delete('/:jobId', authMiddleware, unsaveJob);
router.get('/', authMiddleware, getSavedJobs);

module.exports = router;
