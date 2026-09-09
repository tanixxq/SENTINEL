import express from "express";
import dotenv from "dotenv";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        message:"Sentinel Backend is running"
    });
})

export default app;