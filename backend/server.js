import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["https://proshop01-mern-app.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
dotenv.config();
connectDB();
app.use(express.json());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
  const staticFolder = express.static(
    path.resolve(__dirname, "frontend", "build")
  );
  app.use(staticFolder);
  const buildFolder = path.join(__dirname, "frontend", "build");
  app.get("*", (req, res) => {
    if (fs.existsSync(buildFolder)) {
      const indexFile = path.resolve(
        __dirname,
        "frontend",
        "build",
        "index.html"
      );
      res.sendFile(indexFile);
    } else {
      res.send({
        message: "build folder not found !",
        path: buildFolder,
      });
    }
  });
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.use(notFound);
app.use(errorHandler);
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
