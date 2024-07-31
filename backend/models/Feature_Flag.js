const mongoose = require("mongoose");

const FeatureFlagSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    enabled:{type:Boolean,required:true},
    environment:{type:String,required:true,enum:["Production","Development"]},
    permission:{type:String,default:"Developer",enum:["Developer","Admin"]},
    country:{type:String,enum:["Ghana","Uganda"]},
    description:{type:String}
}
);

module.exports = mongoose.model('Feature_Flag',FeatureFlagSchema);