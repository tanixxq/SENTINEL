import express from "express";
import {
    createMonitor,
    getMonitors,
    getMonitor,
    checkMonitorStatus,
    getMonitorHistory
} from "../Controllers/MonitorController.js";


const router = express.Router();

router.post("/", createMonitor);
router.get("/", getMonitors);
router.get("/:id/history", getMonitorHistory);
router.get("/:id", getMonitor);
router.get("/:id/check", checkMonitorStatus);
export default router;