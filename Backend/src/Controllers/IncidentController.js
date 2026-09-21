import Monitor from "../Models/Monitor.js";
import Incident from "../Models/Incident.js";

export const getIncidents = async (req, res) => {
    try {
        const monitors = await Monitor.find({
            user: req.user.id
        }).select("_id");

        const monitorIds = monitors.map(
            (monitor) => monitor._id
        );

        const incidents = await Incident.find({
            monitor: { $in: monitorIds }
        })
            .populate("monitor", "name url")
            .sort({ startedAt: -1 });

        res.json(incidents);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch incidents",
            error: error.message
        });
    }
};