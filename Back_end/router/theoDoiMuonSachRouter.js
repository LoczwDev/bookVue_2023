import { Router } from "express";
import express from "express";
import { authGuard } from "../middleware/authMiddleware";
import { checkTheMuon, createMuonSach, deleteMuonSach, getAllMuonSach, getMuonSachByUser } from "../controllers/theoDoiMuonSachControllers";
const router = express.Router();

router.post("/:maSach", authGuard, createMuonSach);
router.get("/muonSachUser", authGuard, getMuonSachByUser);
router.delete("/:idMuonSach", authGuard, deleteMuonSach);
router.get("/", getAllMuonSach);
router.put("/checkMuonSach/:idMuonSach", checkTheMuon);

export default router;
