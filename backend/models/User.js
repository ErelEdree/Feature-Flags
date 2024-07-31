const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
userName:{type:String,required:true,unique:true},
password: {type:String, required:true},
role:{type: String, enum:['Developer','Admin'], default:'Developer'},
},{versionKey:false}
);

module.exports = mongoose.model('User',UserSchema);