const express = require('express');
const Flag = require("../models/Feature_Flag");
const flagsController = require("../controllers/featureFlagsController")
const router = express.Router();

//create new feature_flag
router.post('/',flagsController.createFeatureFlag);

//get all flags
router.get('/',flagsController.getAllFlags);

//fetch a certain flag
router.get('/:id', flagsController.getFlagById); 

//update a certain flag
router.put("/:id", flagsController.updateFeatureFlag);

//delete a flag
router.delete("/:id", flagsController.deleteFeatureFlag);

module.exports = router;