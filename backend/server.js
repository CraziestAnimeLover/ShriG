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

// Allowed origins
const allowedOrigins = [
  "http://localhost:5174", // changed from 5173 to 5174
  "https://shri-778epsz1b-craziestanimelovers-projects.vercel.app",
  "https://shri-g-seven.vercel.app",
  "https://shri-g-admin.vercel.app",
  "https://shri-oj1zmkrt8-craziestanimelovers-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or server requests
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// DB connection
connectDB();

// API routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve uploads folder
app.use("/images", express.static("uploads"));

// Root
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// Listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; // For Vercel serverless
