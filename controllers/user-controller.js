const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const bodyParser = require('body-parser');
 require("dotenv").config()

 //const Cloudinary = require('../models/storage/cloudinary')

const controller = express()





const createUser = async(req, res, next)=>{
    try {
        const {complete_name, role, email,  password}= req.body

        // check if user exist


        const adminUserExist = await User.findOne({email})
        if(adminUserExist){
            return res.status(400).json({
                status: false,
                message: 'user already registered'
        })
        }
       

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
    



        // creating user
        //const result = await Cloudinary.uploader.upload(req.file.path);


        const admin = await User.create({
                //avatar:result.secure_url,
                complete_name: complete_name,
                email: email,
                password: hashedPassword,
                role: role,
               
               
            })

        if(!admin) return res.status(500).json({
            status: false,
            message: 'something went wrong'
        })
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            user: admin
        })

       
        //const result = await User.create(user)
    } catch (error) {
        console.log(error)
    }
}

//for reading all users

const getAllAdminUsers = async(req, res, next)=>{
    try {
        const {page, limit} = req.query
        if(page===0) return res.status(400).json({
            success: true,
            message:'invalide page'
        })
        const usePage = page-1
    const users = await User.find().skip(usePage * limit).limit(limit)
    if(!users){
        res.status(404).json({
            success: false,
            message: "users not found"
        })
        // throw new Error('Users not found')
    }
    res.status(200).json({
        success: true,
        message: 'users fetched successfully',
        users: users
    })
    } catch (error) {
        console.log(error)
    }
    
}


const getSingleAdminUser = async(req, res, next)=>{
   try {
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})
    const user = await User.findById(id)

    if(!user){
        res.status(404).json({
            success: false,
            message:'user not found'
        })
        // throw new Error('User not found')
    }
    res.status(200).json({
        status: true,
        message: 'user fetched successfully',
        user: user
    })
   } catch (error) {
    console.log(error)
   }
}


const updateAdminUser = async(req, res, next)=>{
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})

    const user = await User.findById(id)
    if(!user){
        res.status(404)
        // throw new Error('User not found')
    }
    //await Cloudinary.uploader.destroy(user.cloudinary_id);
        // Upload new image to cloudinary
    //const result = await Cloudinary.uploader.upload(req.file.path);

    const newUpdate = {
        //avatar: result.secure_url ||user.identity_card,
        name: req.body.complete_name,
        email: req.body.email,
        role: req.body.role,
        //cloudinary_id: result.public_id|| user.cloudinary_id
       
    }


    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        newUpdate,
        {new: true}
    )
    res.status(200).json(updatedUser)

}

const deleteUser = async(req, res, next)=>{
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400)
    const user = await User.findById(id)
    const userDelete = await User.findByIdAndDelete(
        req.params.id
    )
    if(!userDelete){ 
        res.status(404).json({
            message: 'user not found',
            user: userDelete
        })
        // throw new Error('User not found')
    }
    //await Cloudinary.uploader.destroy(user.cloudinary_id);
    
    //await User.remove()
    res.status(200).json({
        message: 'user deleted successfully',
        user: userDelete
    })
}


const loginUser = async(req,res)=>{

    const {email, password} = req.body

    if(!email || !password){
        res.status(400).json({
            message: 'all fields are required'
        }
        )
        
    }
    else{    
        
       
        
        const user = await User.findOne({email})
        
        if(user.role!=='admin') return res.status(403).json({message:'only user with admin role can login'})
        // !user && res.status(404).json("user not found");

        // const validPsaaword = await bcrypt.compare(password, user.password)
        // !validPassword && res.status(400).json("wrong password")

        if(user && (await bcrypt.compare(password, user.password))){
            const accessToken = jwt.sign({
                user:{
                    email: user.email,
                    name: user.complete_name,
                    role: user.role,
                    //gender: user.gender,
                     id : user.id
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "3000m"}
            )
            res.status(200).json({
                message: 'login successful',
                accessToken: accessToken
            })
        }else return res.status(401).json({
            message:'email or password is not valid'
        }
        
        )}
    
} 

// current info for  authenticated user

const currentUser = async(req,res)=>{

        res.json(req.user)
    //     if(res.headersSent !== true) {
    //     res.send('Hello World!');
    // }
    
}



module.exports = {
    createUser,
    getAllAdminUsers,
    getSingleAdminUser,
    updateAdminUser,
    deleteUser, 
    loginUser,
    currentUser
}

