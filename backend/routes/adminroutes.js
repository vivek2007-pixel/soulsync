import express from "express";
import {
  getAdminMetrics,
  getAdminUsers
} from "../controllers/admin_controller.js";

const router = express.Router();

router.get("/metrics", getAdminMetrics);
router.get("/users", getAdminUsers);

export default router;
