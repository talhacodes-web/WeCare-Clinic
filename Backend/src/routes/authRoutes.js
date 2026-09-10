const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    logout,
    refreshToken,
    getMe,
} = require("../controllers/authController");

const {
    verifyAccessToken,
    verifyRefreshToken,
} = require("../middleware/auth");

// POST /api/auth/signup  — Register a new patient account
router.post("/signup", signup);

// POST /api/auth/login   — Login with email + password
router.post("/login", login);

// POST /api/auth/logout  — Invalidate session (access token required)
router.post("/logout", verifyAccessToken, logout);

// POST /api/auth/refresh-token — Rotate refresh token, get new access token
router.post("/refresh-token", verifyRefreshToken, refreshToken);

// GET  /api/auth/me      — Get current user's profile
router.get("/me", verifyAccessToken, getMe);

module.exports = router;
