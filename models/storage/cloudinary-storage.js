const cloudinary = require('cloudinary')
const {cloudinaryStorage}=require('multer-storage-cloudinary')




const Storage = new cloudinaryStorage ({
    cloudinary:cloudinary,
    params:{
        folder:'foldaer name'
    }
})


module.exports = Storage