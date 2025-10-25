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
import "./config/cloudinary.js";

dotenv.config();

const app = express();

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect DB
connectDB(process.env.MONGO_URI);

// ✅ Helmet + CSP (Fixed for Cloudinary)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https:"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://res.cloudinary.com/",
        ],
        mediaSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://res.cloudinary.com/",
        ],
        connectSrc: [
          "'self'",
          "http://localhost:5173",
          "https://res.cloudinary.com",
          "https://api.cloudinary.com",
        ],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        frameSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS setup
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// ✅ Static uploads (for local testing)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/pages", pageRoutes);

// ✅ Test API
app.get("/api/hy", (req, res) => {
  res.send("hy there from backend");
});

// ✅ FRONTEND BUILD (Dynamic path)
let frontendPath;
if (process.env.NODE_ENV === "production") {
  // For Vercel or production build
  frontendPath = path.join(__dirname, "frontend/dist");
} else {
  // For local dev
  frontendPath = path.join(__dirname, "../frontend/frontend/dist");
}

app.use(express.static(frontendPath));

// ✅ Catch-all route (React Router support)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
