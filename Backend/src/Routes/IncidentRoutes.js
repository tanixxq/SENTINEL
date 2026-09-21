import express from "express";
import { getIncidents } from "../Controllers/IncidentController.js";
import authMiddleware from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getIncidents);

export default router;