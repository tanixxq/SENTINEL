import Monitor from "../Models/Monitor.js";
import { checkMonitor } from "../Services/MonitorChecker.js";

export const createMonitor = async (req, res) => {
    try {
        const { url, name } = req.body;

        const monitor = await Monitor.create({
            url,
            name
        });

        res.status(201).json(monitor);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create monitor"
        });
    }
};

export const getMonitors = async (req, res) => {
    try {
        const monitors = await Monitor.find();

        res.json(monitors);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch monitors"
        });
    }
};

export const getMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.findById(req.params.id);

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        res.json(monitor);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch monitor"
        });
    }
};

export const checkMonitorStatus = async (req, res) => {
    try {
        const monitor = await Monitor.findById(req.params.id);

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        const result = await checkMonitor(monitor.url);

        monitor.status = result.status;
        monitor.responseTime = result.responseTime;
        monitor.lastCheckedAt = new Date();

        await monitor.save();

        res.json({
            monitor,
            check: result
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to check monitor"
        });
    }
};