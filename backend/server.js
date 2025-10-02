<<<<<<< HEAD
import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import dotenv from 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
=======
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";
>>>>>>> 29f89c05b11d8a4801082d1080c0bcab887da040

// App config
const app = express();
const port = process.env.PORT || 4000;
<<<<<<< HEAD
// middlewares
app.use(express.json())
app.use(cors())


=======

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
>>>>>>> 29f89c05b11d8a4801082d1080c0bcab887da040

// DB connection
connectDB();

<<<<<<< HEAD
app.get("/test", (req, res) => {
    res.send("API Working in test route ")
  });

// app.listen(port, () => console.log(`Server started on http://localhost:${port}`))

// db connection
connectDB().then(()=>{
  console.log("db is connected")
  
  app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
})
.catch((e)=>{
  console.error("db conection is not connected")
  console.log("error",e)
})
=======
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
>>>>>>> 29f89c05b11d8a4801082d1080c0bcab887da040
