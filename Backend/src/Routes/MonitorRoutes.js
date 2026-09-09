import express from "express";

import {
    createMonitor,
    getMonitors,
    getMonitor,
    checkMonitorStatus,
    getMonitorHistory,
    getMonitorMetrics,
    getMonitorIncidents
} from "../Controllers/MonitorController.js";

const router = express.Router();

router.post("/", createMonitor);

router.get("/", getMonitors);

router.get("/:id/check", checkMonitorStatus);

router.get("/:id/history", getMonitorHistory);

router.get("/:id/metrics", getMonitorMetrics);

router.get("/:id/incidents", getMonitorIncidents);

router.get("/:id", getMonitor);

export default router;