import { Router } from "express";
import express from "express";
import {
  createSach,
  deleteSach,
  getAllSach,
  getDetailSach,
  updateSach,
} from "../controllers/sachControllers";

const router = express.Router();

router.post("/", createSach);
router.get("/", getAllSach);
router.get("/:maSach", getDetailSach);
router.put("/:maSach", updateSach);
router.delete("/:maSach", deleteSach);

export default router;
