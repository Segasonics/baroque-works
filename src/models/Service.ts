import mongoose from "mongoose";

interface Service extends mongoose.Document {
  name: string;
  description: string;
  icon?: string;
}

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Service>("Service", serviceSchema);
