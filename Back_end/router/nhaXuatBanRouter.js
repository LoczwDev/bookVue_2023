import { Router } from "express";
import express from "express";
import {
  createNhaXuatBan,
  deleteNhaXuatBan,
  getAllNhaXuatBan,
  getNhaXuatBanDetails,
  updateNhaXuatBan,
} from "../controllers/nhaXuatBanControllers";

const router = express.Router();

router.post("/", createNhaXuatBan);
router.get("/", getAllNhaXuatBan);
router.get("/:idNXB", getNhaXuatBanDetails);
router.delete("/:idNXB", deleteNhaXuatBan);
router.put("/:idNXB", updateNhaXuatBan);

export default router;
