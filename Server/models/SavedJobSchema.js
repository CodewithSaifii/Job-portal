const mongoose =  require('mongoose')


const SavedJobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SavedJob',SavedJobSchema);