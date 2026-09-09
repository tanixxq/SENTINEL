import mongoose from "mongoose";

const monitorCheckSchema = new mongoose.Schema(
    {
        monitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Monitor",
            required: true,
            index: true
        },

        status: {
            type: String,
            enum: ["UP", "DOWN"],
            required: true
        },

        statusCode: {
            type: Number,
            default: null
        },

        responseTime: {
            type: Number,
            default: null
        },

        checkedAt: {
            type: Date,
            default: Date.now
        }
    }
);

const MonitorCheck = mongoose.model(
    "MonitorCheck",
    monitorCheckSchema
);

export default MonitorCheck;