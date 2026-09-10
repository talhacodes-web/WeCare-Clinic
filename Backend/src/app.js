const dns = require("dns");
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── Core Middleware ──────────────────────────────────────────────────────────

app.use(cors({
    origin: config.clientOrigin,
    credentials: true, // Allow cookies (refresh token) to be sent cross-origin
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contactRoutes);




// Health check
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "WeCare Dental Clinic API is running." });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running successfully!"
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ─── Global Error Handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

module.exports = app;
