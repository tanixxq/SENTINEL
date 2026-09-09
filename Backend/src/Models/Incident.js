import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
    {
        monitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Monitor",
            required: true,
            index: true
        },

        status: {
            type: String,
            enum: ["ONGOING", "RESOLVED"],
            default: "ONGOING"
        },

        startedAt: {
            type: Date,
            default: Date.now
        },

        resolvedAt: {
            type: Date,
            default: null
        },

        duration: {
            type: Number,
            default: null
        }
    },
    { timestamps: true }
);

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;