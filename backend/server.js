require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Routes
const authRoutes = require("./routes/auth");
const flagRoutes = require("./routes/flags");
//initialising express app:
const app = express();
const PORT = 4000;

//middleware:
app.use(bodyParser.json());
app.use(cors());


//connecting to mongoose server:
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
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