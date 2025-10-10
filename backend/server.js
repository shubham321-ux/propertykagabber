import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/properties.js";
import errorHandler from "./middleware/errorHandler.js";
import blogRoutes from "./routes/blogs.js";
import contactRoutes from "./routes/contact.js";
import pageRoutes from "./routes/pages.js";

dotenv.config();
const app = express();

// resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect DB
connectDB(process.env.MONGO_URI);

// Helmet + CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        imgSrc: ["'self'", "data:", "blob:"],
        mediaSrc: ["'self'", "blob:"],
        connectSrc: ["'self'", "http://localhost:5173"],
        objectSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/pages", pageRoutes);

// Test API
app.get("/api/hy", (req, res) => {
  res.send("hy there from backend");
});

// ✅ FRONTEND BUILD - dynamic path
let frontendPath;
if (process.env.NODE_ENV === "production") {
  // For Vercel deployment: move frontend build inside backend/frontend/dist
  frontendPath = path.join(__dirname, "frontend/dist");
} else {
  // For local dev (nested folder)
  frontendPath = path.join(__dirname, "../frontend/frontend/dist");
}

app.use(express.static(frontendPath));

// Catch-all: send React index.html for non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ERROR HANDLER
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
