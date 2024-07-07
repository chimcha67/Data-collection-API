const express = require('express')
const Data_Ent = require('../models/data')
const User = require('../models/User')
//const Cloudinary = require('../models/storage/cloudinary')





// create and save new article

const enterData = async(req, res,next)=>{
   try {
     // validate request
    const {RD_No, C_No, nameOfClinic_Clinician, clinic_case, phone, ownerName, address, typeOfanimal, breed, age, gender, specie} = req.body
    const id = req.user.id
    const user = await User.findById(id) 
    
    //const result = await Cloudinary.uploader.upload(req.file.path);


    // create a article
    // const url = [ {
        
    // }]
    // let pictureFiles = req.files;
    // let multiplePicturePromise = pictureFiles.map((picture) =>
    // Cloudinary.uploader.upload(picture.path)

//   );
  // await all the cloudinary upload functions in promise.all, exactly where the magic happens
//   let imageResponses = await Promise.all(multiplePicturePromise);
//   for(let i=0; i<imageResponses.length; i++){
//     url.push(i.secure_url)
//   }
//   console.log(imageResponses[0].secure_url)
//     const image_ids = []
//   for(var i=0;i<req.files.length;i++){
//     var locaFilePath = req.files[i].path
//     var result = await Cloudinary.uploader.upload(locaFilePath)
//     url[i]= {img_url:result.secure_url, id:result.public_id}

//     image_ids.push(result.public_id)
//   }
    const data_entries = await Data_Ent.create({
        RD_No: RD_No,
        C_No: C_No,
        nameOfClinic_Clinician: nameOfClinic_Clinician,
        clinic_case: clinic_case,
        phone: phone,
        ownerName: ownerName,
        address: address,
        typeOfanimal: typeOfanimal,
        breed: breed,
        age: age,
        gender: gender,
        specie: specie,
        user_id: req.user.id,
        

        
    })

    if(!data_entries) return res.status(500).json({
        status: false,
        message: 'something went wrong'
    })
     res.status(201).json({
        success: true,
        message: 'Data entry added successfully',
        Data_entries: data_entries
    })

   } catch (error) {
     console.log(error)
   }

};

// get all article


const getAllDataEntries = async(req, res, next)=>{
    try {
        const allData = await Data_Ent.find({user_id: req.user.id})

    if(!allData){
       return res.status(404).json({
            success: false,
            message: "Data entry is empty"
        })
        // throw new Error('Users not found')
    }
    res.status(200).json({
        success: true,
        message: 'Data entries fetched successfully',
        Entries: allData
    })
    } catch (error) {
        console.log(error)
    }
}


const getSingleDataEntry = async(req, res, next)=>{
    try {
     const id = req.params.id
     if(id.length>24 || id.length<24) return res.status(400).json({message: 'invalid id'})
     const data = await Data_Ent.findById(id)

  if(JSON.stringify(data.user_id) !== JSON.stringify(req.user.id)){
    return res.status(403).json({
        message: 'user cannot edit another edit data submitted by other user'
    })
}
     res.status(200).json({
         status: true,
         message: 'Data fetched successfully',
         data: data
     })
    } catch (error) {
     console.log(error)
    }
 }

    // update a article idemtified by todoid in the request

const updateData = async(req, res, next)=>{
    const id = req.params.id
    const data = await Data_Ent.findById(id)
    if(!data){
        return res.status(400).json({message: 'content cannot be empty'})
    }

    if(JSON.stringify(data.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot edit data submitted by another user'
        })
    }
    // find a article and update
    const {RD_No, C_No, nameOfClinic_Clinician, clinic_case, phone, ownerName, address, typeOfanimal, breed, age, gender, specie} = req.body

    const user_id = req.user.id
    if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})

    const user = await User.findById(user_id) 
    //let cloud_img_id = article.cloudinary_id
//     for(var i=0;i<cloud_img_id.length;i++){

//     cloud_img_id.map(imgId=>{
//          if(JSON.stringify(article.image[i].id) === JSON.stringify(imgId)){
//               Cloudinary.uploader.destroy(article.image[i].id);
//          }
//     })
// }
    // Upload new image to cloudinary
   


//     const url = [{}]
//     const image_ids = []
//   for(var i=0;i<req.files.length;i++){
//     var locaFilePath = req.files[i].path
//     var result = await Cloudinary.uploader.upload(locaFilePath)
//     url[i]= {img_url:result.secure_url, id:result.public_id}

//     image_ids.push(result.public_id)
//   }

    const newUpdate = {
        RD_No: RD_No,
        C_No: C_No,
        nameOfClinic_Clinician: nameOfClinic_Clinician,
        clinic_case: clinic_case,
        phone: phone,
        ownerName: ownerName,
        address: address,
        typeOfanimal: typeOfanimal,
        breed: breed,
        age: age,
        gender: gender,
        specie: specie,
        user_id: req.user.id,

   
}

    const updatedData = await Data_Ent.findByIdAndUpdate(
        req.params.id,
        newUpdate,
        {new: true}
    )
    
    
    res.status(200).json(updatedData)
}



// delete a article by an id

const deleteData = async(req, res, next)=>{
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})

    if(id.length>24 || id.length<24) return res.status(400)
    const data = await Data_Ent.findById(req.params.id)
   
    if(!data){ 
        return res.status(404).json({
            message: 'data not found',
        })
    }
    if(JSON.stringify(data.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot edit another users article'
        })
    }
//     let cloud_img_id = article.cloudinary_id
//     for(var i=0;i<cloud_img_id.length;i++){

//     cloud_img_id.map(imgId=>{
//          if(JSON.stringify(article.image[i].id) === JSON.stringify(imgId)){
//               Cloudinary.uploader.destroy(article.image[i].id);
//          }
//     })
// }

    const dataDelete = await Data_Ent.findByIdAndDelete(id)
    
    res.status(200).json({
        message: 'data deleted successfully',
        data: dataDelete
    })

}


module.exports = {
    enterData,
    deleteData,
    getAllDataEntries,
    getSingleDataEntry,
    updateData
}