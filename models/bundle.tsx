import mongoose, { Schema } from "mongoose";

const bundleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: [String],
      required: true,
    },
    object_type: {
      type: String,
      enum: ["Item", "Bundle"],
      required: true,

    },
    status: {
      type: String,
      enum: ["pending", "published"],
      default: "pending",
    },
    created_by: {
      type: String,
      default: "Jill Boarne",
      required: true,
    },
    publish_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Bundle = mongoose.models.Bundle || mongoose.model("Bundle", bundleSchema);

export default Bundle;
