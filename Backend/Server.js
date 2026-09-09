import "dotenv/config";
import app from "./src/App.js";

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`SENTINEL server running on port ${PORT}`);
});