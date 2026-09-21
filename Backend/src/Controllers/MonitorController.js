import Monitor from "../Models/Monitor.js";
import { runMonitorCheck } from "../Services/MonitorService.js";
import MonitorCheck from "../Models/MonitorCheck.js";
import Incident from "../Models/Incident.js";



export const createMonitor = async (req, res) => {
    try {
        const { url, name } = req.body;

        const monitor = await Monitor.create({
            user: req.user.id,
            url,
            name
        });

        res.status(201).json(monitor);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create monitor",
            error: error.message
        });
    }
};

export const getMonitors = async (req, res) => {
    try {
        const monitors = await Monitor.find({
            user: req.user.id
        });

        res.json(monitors);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch monitors",
            error: error.message
        });
    }
};

export const getMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        res.json(monitor);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch monitor",
            error: error.message
        });
    }
};


export const checkMonitorStatus = async (req, res) => {
    try {
        const monitor = await Monitor.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        const result = await runMonitorCheck(monitor);

        res.json({
            monitor,
            check: result
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to check monitor"
        });
    }
};







export const getMonitorHistory = async (req, res) => {
    try {
        const monitor = await Monitor.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        const history = await MonitorCheck.find({
            monitor: req.params.id
        }).sort({ checkedAt: -1 });

        res.json(history);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch monitor history",
            error: error.message
        });
    }
};

export const getMonitorMetrics = async (req, res) => {
    try {
        const monitor = await Monitor.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        const checks = await MonitorCheck.find({
            monitor: req.params.id
        });

        if (checks.length === 0) {
            return res.json({
                uptime: 0,
                averageResponseTime: 0,
                totalChecks: 0,
                successfulChecks: 0,
                failedChecks: 0
            });
        }

        const successfulChecks = checks.filter(
            check => check.status === "UP"
        ).length;

        const failedChecks = checks.filter(
            check => check.status === "DOWN"
        ).length;

        const totalResponseTime = checks.reduce(
            (sum, check) => sum + (check.responseTime || 0),
            0
        );

        const averageResponseTime =
            totalResponseTime / checks.length;

        const uptime =
            (successfulChecks / checks.length) * 100;

        res.json({
            uptime,
            averageResponseTime,
            totalChecks: checks.length,
            successfulChecks,
            failedChecks
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch monitor metrics",
            error: error.message
        });
    }
};

export const getMonitorIncidents = async (req, res) => {
    try {
        const monitor = await Monitor.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        const incidents = await Incident.find({
            monitor: req.params.id
        }).sort({ startedAt: -1 });

        res.json(incidents);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch monitor incidents",
            error: error.message
        });
    }
};

export const getMonitorDashboard = async (req, res) => {
    try {
        const monitor = await Monitor.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }

        const checks = await MonitorCheck.find({
            monitor: monitor._id
        }).sort({ checkedAt: -1 });

        const totalChecks = checks.length;

        const successfulChecks = checks.filter(
            (check) => check.status === "UP"
        ).length;

        const failedChecks = checks.filter(
            (check) => check.status === "DOWN"
        ).length;

        const totalResponseTime = checks.reduce(
            (sum, check) => sum + (check.responseTime || 0),
            0
        );

        const averageResponseTime =
            totalChecks === 0
                ? 0
                : totalResponseTime / totalChecks;

        const uptime =
            totalChecks === 0
                ? 0
                : (successfulChecks / totalChecks) * 100;

        const recentChecks = checks.slice(0, 10);

        const incidents = await Incident.find({
            monitor: monitor._id
        });

        const activeIncidents = incidents.filter(
            (incident) => incident.status === "ONGOING"
        ).length;

        res.json({
            monitor: {
                name: monitor.name,
                url: monitor.url,
                status: monitor.status,
                responseTime: monitor.responseTime,
                lastCheckedAt: monitor.lastCheckedAt
            },

            metrics: {
                totalChecks,
                successfulChecks,
                failedChecks,
                uptime: Number(uptime.toFixed(2)),
                averageResponseTime: Math.round(averageResponseTime)
            },

            recentChecks: recentChecks.map((check) => ({
                status: check.status,
                responseTime: check.responseTime,
                checkedAt: check.checkedAt
            })),

            incidents: {
                total: incidents.length,
                active: activeIncidents
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to load dashboard"
        });
    }
};