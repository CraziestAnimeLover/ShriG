import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/list", listFood);
router.post("/add", upload.single("image"), addFood);
router.post("/remove", removeFood);

export default router;
