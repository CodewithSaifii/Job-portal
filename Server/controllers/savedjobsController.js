const User = require('../models/SavedJobSchema');

// Save a job
exports.saveJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.jobId;

    const user = await User.findById(userId);
    if (!user.savedJobs.includes(jobId)) {
      user.savedJobs.push(jobId);
      await user.save();
    }

    res.json({ message: 'Job saved successfully', savedJobs: user.savedJobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a saved job
exports.unsaveJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.jobId;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedJobs: jobId }
    });

    res.json({ message: 'Job removed from saved list' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all saved jobs for a user
exports.getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedJobs');
    res.json(user.savedJobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
