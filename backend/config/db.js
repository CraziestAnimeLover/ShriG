import mongoose from "mongoose";

let isConnected;

export const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    console.error("❌ MongoDB URI is missing in environment variables");
    throw new Error("MongoDB URI not found");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connection.readyState;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
};
