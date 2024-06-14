import { Router } from "express";
import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUsers,
  loginGGUser,
  loginUser,
  registerUser,
  updateProfile,
  userProfile,
} from "../controllers/userControllers";

import { authGuard } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/loginGG", loginGGUser);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/changePass", authGuard, changePassword);
router.get("/", getAllUsers);
router.delete("/:userId", deleteUser);
export default router;
