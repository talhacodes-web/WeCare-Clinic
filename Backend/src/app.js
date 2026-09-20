const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const config = require("./config/config");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const aiRoutes = require("./routes/aiRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── Core Middleware ──────────────────────────────────────────────────────────

app.use(cors({
    origin: config.clientOrigin,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "WeCare Dental Clinic API is running."
    });
});

// ─── API Routes ───────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ai", aiRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "WeCare Dental Clinic API is running."
    });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use(errorHandler);

module.exports = app;