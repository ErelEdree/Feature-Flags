const express = require('express');
const User = require("../models/User");

const router = express.Router();

//registration route
router.post('/register',async(req,res)=>{
    const {userName, password, role} = req.body;

    try {
        let user = await User.findOne({userName});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        user = new User({userName,password,role});
        await user.save();

        
        res.status(201).json({message:"User registered successfully"});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");

    }
}
)

router.post("/login",async(req,res)=>{
    const {userName, password, role} = req.body;

    try{
        const user = await User.findOne({userName});
        // check if user exists
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        // check password matches
        if(user.password!=password){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        res.json({message:"Login Successful", userId:user.id, userName:userName});
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error');
    }

})

module.exports = router;