const Job = require('../models/JobSchema');

// Create a job (only employer)
exports.createJob = async (req, res) => {
  try {
    const { title, description, location, salary, jobType, category, company, deadline } = req.body;

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      jobType,
      category,
      company,
      deadline,
      postedBy: req.user.id
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('company', 'name logo')
      .populate('category', 'name');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name logo')
      .populate('category', 'name');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete job (employer)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await job.deleteOne();
    res.json({ message: 'Job deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
