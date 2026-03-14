const express=require('express')
const dotenv=require('dotenv')
dotenv.config();

const cors=require('cors')
const connectDB=require("./config/db")
const authroutes=require("./routes/authroutes")
const recipeRoutes=require("./routes/recipeRoutes")
const adminRoutes = require("./routes/adminRoutes")
const aiRoutes = require("./routes/aiRoutes")

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authroutes)
app.use("/api/recipes",recipeRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/ai",aiRoutes)
app.get("/",(req,res)=>{
    res.send("API is running")
});
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server is running")
    console.log(PORT)
});
connectDB();
