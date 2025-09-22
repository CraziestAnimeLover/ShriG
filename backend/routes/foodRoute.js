import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const foodRouter = express.Router();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Use memory storage (no local folder creation)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Wrap addFood controller to first upload image to Cloudinary
const addFoodWithUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Convert buffer to base64
    const fileBase64 = req.file.buffer.toString("base64");
    const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: "food-images", // optional folder
    });

    // Pass uploaded image URL to addFood controller
    req.body.imageUrl = result.secure_url;

    // Call your existing addFood logic
    addFood(req, res);
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single("image"), addFoodWithUpload);
foodRouter.post("/remove", removeFood);

export default foodRouter;
