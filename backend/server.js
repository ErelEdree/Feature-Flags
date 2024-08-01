require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Routes
const authRoutes = require("./routes/auth");
const flagRoutes = require("./routes/flags");
const seedFeatureFlags = require("./seedFeatureFlags");
//initialising express app:
const app = express();
const PORT = process.env.PORT;

//middleware:
app.use(bodyParser.json());
app.use(cors());


//connecting to mongoose server:
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  await seedFeatureFlags();
}


app.get('/api',(req,res)=>{
    res.json({message:"HELLO WORLD"})
});

app.use('/api/auth', authRoutes);

app.use('/api/flags', flagRoutes)

//start server
app.listen(PORT,()=>{
    console.log(`Running on port: ${PORT}`);
})