import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      console.log("❌ No token found in cookies. User not authenticated.");
      return res.status(401).json({ message: "Not authenticated" });
    }

    console.log("🔑 Token received:", token.substring(0, 20) + "...");

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token verified. Payload:", payload);

    req.userId = payload.sub;
    req.userRole = payload.role;

    console.log(`👤 Authenticated user: ${req.userId} (role: ${req.userRole})`);

    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
