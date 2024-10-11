
const { default: mongoose } = require('mongoose')
const mongoos=require('mongoose')
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:'visitor'
    }
})
const userModel=mongoos.model('users',userSchema)
module.exports=userModel