import express from "express";
import {
  createService,
  getServiceById,
  getServices,
} from "../controllers/serviceController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = express.Router();

router.use(isAuthenticated);

router.get("/services", getServices);
router.post("/service/request", createService);
router.get("/services/:id", getServiceById);

export default router;
