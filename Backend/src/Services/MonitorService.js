
import MonitorCheck from "../Models/MonitorCheck.js";
import Incident from "../Models/Incident.js";
import { checkMonitor } from "./MonitorChecker.js";
import { sendDownAlert, sendRecoveryAlert } from "./AlertServices.js";

export const runMonitorCheck = async (monitor) => {
    await monitor.populate("user", "email");

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

            await sendDownAlert(
                monitor.user.email,
                monitor
            );

            console.log(
                `[SENTINEL] INCIDENT STARTED → ${monitor.name || monitor.url}`
            );
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

            await sendRecoveryAlert(
                monitor.user.email,
                monitor
            );

            console.log(
                `[SENTINEL] INCIDENT RESOLVED → ${monitor.name || monitor.url}`
            );
        }
    }

    monitor.status = result.status;
    monitor.responseTime = result.responseTime;
    monitor.lastCheckedAt = new Date();

    await monitor.save();

    console.log(
        `[SENTINEL] ${monitor.name || monitor.url} → ${result.status} (${result.responseTime}ms)`
    );

    return result;
};

