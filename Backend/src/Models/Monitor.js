import mongoose from "mongoose";

const monitorSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
      },
      url: {
        type: String,
        required: true,
        trim: true
      },
      name: {
        type: String,
        trim: true
      },
      status: {
        type: String,
        enum: ["UP", "DOWN", "PENDING"],
        default: "PENDING"
      },
      responseTime: {
        type: Number,
        default: null
      },
      lastCheckedAt: {
        type: Date,
        default: null
      },
      isActive: {
        type: Boolean,
        default: true
      }
    },
    { timestamps: true }
  );

const Monitor = mongoose.model("Monitor", monitorSchema);

export default Monitor;