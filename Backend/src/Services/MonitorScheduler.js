
import Monitor from "../Models/Monitor.js";
import { runMonitorCheck } from "./MonitorService.js";

const runMonitorChecks = async () => {
    try {
        const monitors = await Monitor.find({
            isActive: true
        });

        console.log(
            `[SENTINEL] Running scheduled checks for ${monitors.length} monitors`
        );

        await Promise.all(
            monitors.map((monitor) =>
                runMonitorCheck(monitor)
            )
        );
    } catch (error) {
        console.error(
            "[SENTINEL] Scheduler error:",
            error.message
        );
    }
};

const startMonitorScheduler = () => {
    runMonitorChecks();

    setInterval(
        runMonitorChecks,
        60 * 1000
    );

    console.log(
        "[SENTINEL] Monitor scheduler started ⏱️"
    );
};

export default startMonitorScheduler;

