import dotenv from "dotenv";

dotenv.config();

import app from "./src/App.js";
import connectDB from "./src/config/db.js";
import startMonitorScheduler from "./src/Services/MonitorScheduler.js";


const startServer = async () => {

    await connectDB();

    app.listen(8000, () => {

        console.log(
            "SENTINEL server running on port 8000"
        );

    });

    startMonitorScheduler();

};


startServer();