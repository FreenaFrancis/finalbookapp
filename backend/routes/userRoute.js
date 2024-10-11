
const express=require('express');

const {  Register, login, getAllUser, getUserById, editUser } = require('../Controllr/userController');
const router=express.Router()

router.post('/register',Register)
router.post('/login',login)
router.get('/getalluser',getAllUser)
router.get('/getuserbyid/:id',getUserById)
router.put('/edituser/:id',editUser)
module.exports=router