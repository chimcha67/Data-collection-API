const mongoose = require('mongoose')


const dataModel =  mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
 
    RD_No: String,
    CD_No: String,
    nameOfClinic_Clinician: {
        type:String,
        required: true
    },
    clinic_case:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    ownerName:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    typeOfanimal:{
        type:String,
        required: true
    },
    breed:{
        type:String,
        required: true
    },
    age:{
        type:String,
        required: true
    },
    gender:{
        type: String,
        enum:['F', 'M'],
        required:true
    },
    
    specie:{
        type:String,
        required: true
    },
    
  

},
{timestamps: true}
)

module.exports = mongoose.model('Data', dataModel)