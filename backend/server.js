// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import blogRoute from './routes/blog.route.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "https://blog-4w1y.onrender.com"], // add your frontend Render domain
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

const PORT = process.env.PORT || 8000;


app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server listening on port: ${PORT}`);
});

