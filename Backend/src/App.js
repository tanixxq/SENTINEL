import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import MonitorRoutes from "./Routes/MonitorRoutes.js";




const app = express();

app.use(cors());
app.use(express.json());
app.use("/monitors", MonitorRoutes);

app.get("/",(req,res)=>{
    res.json({
        message:"Sentinel Backend is running"
    });
})

export default app;