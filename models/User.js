const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    complete_name:{
        type: String,
        required: [true, 'name is required']
    },
    avatar: String,

    cloudinary_id: String,

    role:{
        type: String,
        enum:['admin', 'user'],
        default: 'admin',
        required:true
    },
   
    email:{
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        unique: [true, 'email address already taken'],
    },
    password:{
        type: String,
        required: [true, 'password is required']
    }
    
})

module.exports = mongoose.model('User', UserModel) 