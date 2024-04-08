const mongoose=require("mongoose")
const validator = require('validator');


const Adminschema=new mongoose.Schema({
    name:{type:String,require:true},
    age:Number,
    email: {
        type: String,
        validate: [validator.isEmail, 'Invalid email']
      },
    password:{type:String,require:true},
    role:String
})

module.exports=mongoose.model("admin",Adminschema)