const Application = require('../models/ApplicationSchema');
const Job = require('../models/JobSchema');

// Apply to job (only jobseeker)
exports.applyToJob = async (req, res) => {
  try {
    const { job, coverLetter, resume } = req.body;

    const alreadyApplied = await Application.findOne({
      job,
      applicant: req.user.id
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    const newApp = new Application({
      job,
      applicant: req.user.id,
      coverLetter,
      resume
    });

    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get applications for a job (only employer who posted)
exports.getApplicationsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view applications for this job' });
    }

    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email profile');

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Jobseeker gets their own applications
exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user.id })
      .populate('job', 'title location company');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
