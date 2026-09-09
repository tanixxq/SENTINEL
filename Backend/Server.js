import "dotenv/config";
import app from "./src/App.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`SENTINEL server running on port ${PORT}`);
    });
};

startServer();