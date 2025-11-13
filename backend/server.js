import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import cors from "cors";

// Routes
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173", // ✅ add this
  "http://localhost:5174", 
  "https://shri-778epsz1b-craziestanimelovers-projects.vercel.app",
  "https://shri-g-seven.vercel.app",
  "https://shri-g-admin.vercel.app",
  "https://shri-oj1zmkrt8-craziestanimelovers-projects.vercel.app",
  "http://localhost:4000",
];


// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://shri-778epsz1b-craziestanimelovers-projects.vercel.app",
    "https://shri-g-seven.vercel.app",
    "https://shri-g-admin.vercel.app",
    "https://shri-oj1zmkrt8-craziestanimelovers-projects.vercel.app",
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, token");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Handle preflight requests for POST/PUT
app.options("*", cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve static images
app.use("/images", express.static("uploads"));

// Root route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// Listen (for local testing)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for Vercel serverless
export default app;
