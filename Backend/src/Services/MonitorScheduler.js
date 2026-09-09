import Monitor from "../Models/Monitor.js";
import MonitorCheck from "../Models/MonitorCheck.js";
import { checkMonitor } from "./MonitorChecker.js";
import Incident from "../Models/Incident.js";

const runMonitorChecks = async () => {
    try {
        const monitors = await Monitor.find({
            isActive: true
        });

        for (const monitor of monitors) {
            const result = await checkMonitor(monitor.url);
            await MonitorCheck.create({
                monitor: monitor._id,
                status: result.status,
                statusCode: result.statusCode,
                responseTime: result.responseTime
            })

            if (result.status === "DOWN") {
                const ongoingIncident = await Incident.findOne({
                    monitor: monitor._id,
                    status: "ONGOING"
                });
            
                if (!ongoingIncident) {
                    await Incident.create({
                        monitor: monitor._id,
                        status: "ONGOING",
                        startedAt: new Date()
                    });
            
                    console.log(
                        `[SENTINEL] INCIDENT STARTED → ${monitor.name || monitor.url}`
                    );
                }
            } else if (result.status === "UP") {
                const ongoingIncident = await Incident.findOne({
                    monitor: monitor._id,
                    status: "ONGOING"
                });
            
                if (ongoingIncident) {
                    const resolvedAt = new Date();
            
                    ongoingIncident.status = "RESOLVED";
                    ongoingIncident.resolvedAt = resolvedAt;
            
                    ongoingIncident.duration =
                        resolvedAt.getTime() - ongoingIncident.startedAt.getTime();
            
                    await ongoingIncident.save();
            
                    console.log(
                        `[SENTINEL] INCIDENT RESOLVED → ${monitor.name || monitor.url} (${ongoingIncident.duration}ms)`
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
        }
    } catch (error) {
        console.error(
            "[SENTINEL] Scheduler error:",
            error.message
        );
    }
};

const startMonitorScheduler = () => {
    runMonitorChecks();

    setInterval(runMonitorChecks, 60 * 1000);

    console.log("[SENTINEL] Monitor scheduler started ⏱️");
};

export default startMonitorScheduler;