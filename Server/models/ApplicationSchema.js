const mongoose = require('mongoose')


const ApplicationSchema = new mongoose.Schema({
    job:{type:mongoose.Schema.Types.ObjectId,ref:'Job'},
    applicant:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    resumeLink:String,
    coverLetter:String,
    status:{type:String ,emum:['Applied','ShortListed','Interview','Rejected','Hired'],default:'Applied'},
    appliedAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model('Application',ApplicationSchema)