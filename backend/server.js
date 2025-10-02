import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://shri-778epsz1b-craziestanimelovers-projects.vercel.app',
  'https://shri-g-seven.vercel.app',
  'https://shri-g-admin.vercel.app',
  'https://shri-oj1zmkrt8-craziestanimelovers-projects.vercel.app', // <- add new frontend
];

// Middlewares
app.use(express.json());

// Global CORS handler
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,token");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.sendStatus(200); // preflight
  next();
});

// DB connection
connectDB();

// API routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve images
app.use("/images", express.static("uploads"));

// Root
app.get("/", (req, res) => res.send("API Working"));

app.listen(port, () => console.log(`Server started on port ${port}`));
