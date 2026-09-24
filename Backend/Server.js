import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import app from "./src/App.js";
import connectDB from "./src/config/db.js";
import startMonitorScheduler from "./src/Services/MonitorScheduler.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(
            `SENTINEL server running on port ${PORT}`
        );
    });

    startMonitorScheduler();
};

startServer();