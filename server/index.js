const express = require("express")
const mongoose = require ("mongoose")
const cors= require("cors")
const dotenv= require("dotenv")
const authRoutes= require("./routes/authRoutes")
const fieldRoutes = require('./routes/fieldRoutes');

dotenv.config()


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/auth",authRoutes)
app.use('/api/fields', fieldRoutes);



app.get("/",(req,res)=>{
    res.send("API is Working")
})


mongoose.connect(`${process.env.MONGODB_URL}`).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.error('Database connection error',err)
})

const PORT= process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("server is running on PORT "+ PORT)
})