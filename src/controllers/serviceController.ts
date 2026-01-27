import Service from "../models/Service";
import { Request, Response } from "express";
import axios from "axios";
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json({ message: "Success", services });
  } catch (error) {
    console.error("Error during getServices:", error);
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  const serviceId = req.params.id;
  if (!serviceId) {
    return res.status(400).json({ message: "Service ID is required" });
  }
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Success", service });
  } catch (error) {
    console.error("Error during getServiceById:", error);
  }
};

export const createService = async (req: Request, res: Response) => {
  const { name, email, details, date, serviceName, address } = req.body;
  try {
    const data = await axios.post(process.env.N8N_URI!, {
      name,
      email,
      details,
      date,
      serviceName,
      address,
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error during createService:", error);
  }
};
