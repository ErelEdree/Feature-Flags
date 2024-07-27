const mongoose = require("mongoose");

const FeatureFlagSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    enabled:{type:Boolean,required:true},
    description:{type:String}
}
);

module.exports = mongoose.model('Feature_Flag',FeatureFlagSchema);