import express from "express";
import cors from "cors";
import MonitorRoutes from "./Routes/MonitorRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import authMiddleware from "./Middleware/AuthMiddleware.js";
import { sendDownAlert } from "./Services/AlertServices.js";


const app = express();

app.use(cors());

app.use(express.json());


app.use("/auth", AuthRoutes);

app.use("/monitors", MonitorRoutes);


app.get("/protected-test", authMiddleware, (req, res) => {

    res.json({
        message: "You accessed a protected route",
        user: req.user
    });

});


app.get("/", (req, res) => {

    res.json({
        message: "Sentinel Backend is running"
    });

});

app.get("/test-email", async (req, res) => {
    await sendDownAlert(
        process.env.EMAIL_USER,
        {
            name: "Sentinel Test Monitor",
            url: "https://example.com"
        }
    );

    res.json({
        message: "Test email triggered"
    });
});

export default app;