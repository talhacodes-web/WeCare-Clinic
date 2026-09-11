const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const config = require("./config/config");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const contactRoutes = require("./routes/contactRoutes");
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

// ─── API Routes ───────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contactRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "WeCare Dental Clinic API is running."
    });
});

// ─── Backend Root ─────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running successfully!"
    });
});

// ─── Serve React Frontend ─────────────────────────────────────────────────────

const frontendPath = path.join(__dirname, "../dist");

app.use(express.static(frontendPath));

// React Router fallback
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use(errorHandler);

module.exports = app;