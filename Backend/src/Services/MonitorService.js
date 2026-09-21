
import MonitorCheck from "../Models/MonitorCheck.js";
import Incident from "../Models/Incident.js";
import { checkMonitor } from "./MonitorChecker.js";

export const runMonitorCheck = async (monitor) => {
    const result = await checkMonitor(monitor.url);

    await MonitorCheck.create({
        monitor: monitor._id,
        status: result.status,
        statusCode: result.statusCode,
        responseTime: result.responseTime
    });

    const ongoingIncident = await Incident.findOne({
        monitor: monitor._id,
        status: "ONGOING"
    });

    if (result.status === "DOWN") {
        if (!ongoingIncident) {
            await Incident.create({
                monitor: monitor._id,
                status: "ONGOING",
                startedAt: new Date()
            });
        }
    }

    if (result.status === "UP") {
        if (ongoingIncident) {
            const resolvedAt = new Date();

            ongoingIncident.status = "RESOLVED";
            ongoingIncident.resolvedAt = resolvedAt;
            ongoingIncident.duration =
                resolvedAt.getTime() -
                ongoingIncident.startedAt.getTime();

            await ongoingIncident.save();
        }
    }

    monitor.status = result.status;
    monitor.responseTime = result.responseTime;
    monitor.lastCheckedAt = new Date();

    await monitor.save();

    return result;
};

