import express from "express";
import {
    createMonitor,
    getMonitors,
    getMonitor
} from "../Controllers/MonitorController.js";

const router = express.Router();

router.post("/", createMonitor);

router.get("/", getMonitors);
router.get("/:id", getMonitor);
export default router;