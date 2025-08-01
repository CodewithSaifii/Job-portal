const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
    name:String,
    industry:String,
    description:String,
    website:String,
    logo:String,
    location:String,
    owner:{type:mongoose.Schema.Types.ObjectId ,ref:'User'},

})

module.exports = mongoose.model('Company', CompanySchema);
