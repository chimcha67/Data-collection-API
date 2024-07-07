const express = require('express')
const userCntroller = require('../controllers/user-controller')
const {validateToken} = require('../auth/validateUserToken')
const Router = express.Router()
const cors = require('cors')
const  userService  = require('../controllers/user.services')
const dataController = require('../controllers/data-controller')




Router.post('/input/data',validateToken, dataController.enterData)
Router.get('/data/all',validateToken, dataController.getAllDataEntries)

Router.post('/create', userCntroller.createUser)
Router.get('/current', userCntroller.currentUser)
Router.get('/', userCntroller.getAllAdminUsers)
Router.get('/:id', userCntroller.getSingleAdminUser)
Router.put('/:id', userCntroller.updateAdminUser)
Router.delete('/:id', userCntroller.deleteUser)


Router.post('/login', userCntroller.loginUser )


Router.get('/data/single/:id',validateToken, dataController.getSingleDataEntry)
Router.put('/data/edit/:id', validateToken, dataController.updateData)

Router.delete('/data/del/:id',validateToken, dataController.deleteData)




// Router.get('/all', userCntroller.getUsers)
//Router.get('/del', userCntroller.deleteUser)
//Router.get('/getSingleUser', userCntroller.singleUser)

 

module.exports = Router