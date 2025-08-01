const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['jobseeker', 'employer'] },
  profile: {
    resume: String,
    skills: [String],
    experience: String,
    location: String,
    phone: String,
    education: String
  },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
