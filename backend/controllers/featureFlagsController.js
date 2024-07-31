const Flag = require("../models/Feature_Flag");

//interaction with database
exports.createFeatureFlag = async(req,res) =>{
try{
const {name, enabled, environment, permission ,country, description} = req.body;
const existingFlag = await Flag.findOne({name});
if(existingFlag){
    return res.status(400).json({message:"flag with that name already exists, choose a differnet name"});
}
const newFlag = new Flag({name, enabled, environment, permission ,country, description});
await newFlag.save();
res.status(201).json(newFlag);
}catch(error){
    res.status(400).json({message:error.message});
}
}

exports.getAllFlags = async(req,res)=>{
    try{
        const Flags = await Flag.find();
        res.status(200).json(Flags);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

exports.getFlagById = async(req,res)=>{
    try{
        const flag = Flag.findById(req.params.id);
        if(!flag){
            res.status(404).json({message:"Feature Flag not found"});
        }
        res.status(200).json(flag);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

exports.updateFeatureFlag = async (req, res) => {
    try {
      const { name, enabled, environment, permission ,country, description } = req.body;
      const flag = await Flag.findByIdAndUpdate(req.params.id, { name, enabled, environment, permission ,country, description }, { new: true, runValidators: true });
      if (!flag) {
        return res.status(404).json({ message: 'Feature flag not found' });
      }
      res.status(200).json(flag);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a feature flag
  exports.deleteFeatureFlag = async (req, res) => {
    try {
      const flag = await Flag.findByIdAndDelete(req.params.id);
      if (!flag) {
        return res.status(404).json({ message: 'Feature flag not found' });
      }
      res.status(200).json({ message: 'Feature flag deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };