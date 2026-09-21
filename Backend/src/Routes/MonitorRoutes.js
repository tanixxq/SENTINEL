import express from "express";

import {
    createMonitor,
    getMonitors,
    getMonitor,
    checkMonitorStatus,
    getMonitorHistory,
    getMonitorMetrics,
    getMonitorIncidents,
    getMonitorDashboard
} from "../Controllers/MonitorController.js";
import authMiddleware from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/",authMiddleware, createMonitor);

router.get("/",authMiddleware, getMonitors);

router.get("/:id/check", authMiddleware, checkMonitorStatus);

router.get("/:id/history",authMiddleware, getMonitorHistory);

router.get("/:id/metrics",authMiddleware, getMonitorMetrics);

router.get("/:id/incidents",authMiddleware, getMonitorIncidents);

router.get("/:id/dashboard",authMiddleware, getMonitorDashboard);

router.get("/:id",authMiddleware, getMonitor);

export default router;