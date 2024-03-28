import express from "express";
import {
  createRegion,
  getRegionByValue,
  updateRegionById,
  deleteRegionById,
  getAllRegions,
} from "../controllers/region.controller";

const router = express.Router();

// Create a new region
router.get("/regions", getAllRegions);

router.post("/regions", createRegion);

// Get region by value
router.get("/regions/:value", getRegionByValue);

// Update region by ID
router.put("/regions/:id", updateRegionById);

// Delete region by ID
router.delete("/regions/:id", deleteRegionById);

export default router;
