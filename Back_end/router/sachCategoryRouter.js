import { Router } from "express";
import express from "express";
import {
  createCatgory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategorySach,
} from "../controllers/sachCategoryControllers";

const router = express.Router();

router.post("/", createCatgory);
router.get("/", getAllCategory);
router.get("/:categoryId", getCategory);
router.put("/:categoryId", updateCategorySach);
router.delete("/:categoryId", deleteCategory);

export default router;
