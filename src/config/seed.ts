import dotenv from "dotenv";
import { connectDB } from "./db";
import Service from "../models/Service";
dotenv.config();

const servicesData = [
  {
    name: "Plumbing",
    description: "Professional plumbing services for all your needs",
    icon: "Wrench",
  },
  {
    name: "Electrical",
    description: "Licensed electricians for installations and repairs",
    icon: "Zap",
  },
  {
    name: "Estate Management",
    description: "Comprehensive property management services",
    icon: "Home",
  },
  {
    name: "Rental Services",
    description: "Find your perfect rental property",
    icon_name: "Key",
  },
  {
    name: "HVAC",
    description: "Heating, ventilation, and air conditioning services",
    icon: "Wind",
  },
  {
    name: "Landscaping",
    description: "Professional lawn care and landscaping",
    icon: "Trees",
  },
];

console.log("Services data:", servicesData[0]);
const insertServices = async () => {
  try {
    await connectDB();
    await Service.insertMany(servicesData);
    process.exit(0);
  } catch (error) {
    console.error("Error inserting services:", error);
    process.exit(1);
  }
};

insertServices();
