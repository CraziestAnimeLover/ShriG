import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// ⚡ CORS for your frontend
const allowedOrigins = [
  'https://shri-778epsz1b-craziestanimelovers-projects.vercel.app',
  'https://shri-g-seven.vercel.app',
  'https://shri-g-admin.vercel.app',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// DB connection
connectDB();

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve images folder
app.use("/images", express.static("uploads"));

// Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Listen
app.listen(port, () => console.log(`Server started on port ${port}`));

export default app; // for Vercel serverless
