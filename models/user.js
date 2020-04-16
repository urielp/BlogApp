const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSChema = mongoose.Schema({
  name:{type:String,requierd:true},  
  email:{type:String,requierd:true},
  password:{type:String,requierd:true},
  passwordTest:{type:String,requierd:true},
  joinDate:{type:Date}
})
userSChema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSChema);