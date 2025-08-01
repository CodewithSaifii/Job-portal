const mongoose =  require('mongoose')

const JobSchema= new mongoose.Schema({
    title:String,
    description:String,
    location:String,
    salary:String,
    jobType:{type:String,enum:['Full-Time','Part-Time','Intership','Remote']},
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    postBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    deadline:Date,
    createdAt:{type:Date ,default:Date.now},
    })

module.exports = mongoose.model('Job',JobSchema);