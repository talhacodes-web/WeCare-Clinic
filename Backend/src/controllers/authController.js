const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");
const { sendWelcomeEmail } = require("../services/emailService");

// ─── Token Helpers ────────────────────────────────────────────────────────────

/**
 * Generate a short-lived access token (15 min by default)
 */
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwtAccessSecret,
        { expiresIn: config.jwtAccessExpiry }
    );
};

/**
 * Generate a long-lived refresh token (7 days by default)
 */
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwtRefreshSecret,
        { expiresIn: config.jwtRefreshExpiry }
    );
};

/**
 * Set refresh token as a secure httpOnly cookie
 */
const setRefreshCookie = (res, token) => {
    res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });
};

// ─── Controllers ─────────────────────────────────────────────────────────────

/**
 * POST /api/auth/signup
 */
const signup = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        // Basic required field check
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email, phone, and password.",
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        // Create user (password hashed via pre-save hook in model)
        const user = await User.create({ name, email, phone, password });

        // Issue tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Persist refresh token in DB for rotation validation
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        setRefreshCookie(res, refreshToken);

        // Send welcome email (non-blocking so signup is fast and never fails due to email delays/credentials)
        sendWelcomeEmail(user).catch((emailErr) => {
            console.error("[Auth] Error sending welcome email:", emailErr?.message || emailErr);
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully! Welcome to WeCare Clinic.",
            accessToken,
            user: user.toPublicJSON(),
        });
    } catch (err) {
        // Forward to the global error handler so the client gets a proper
        // JSON error response (and duplicate-email / validation errors are
        // translated) instead of the request hanging.
        next(err);
    }
};

/**
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password.",
            });
        }

        // Include password field (excluded by default via `select: false`)
        const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "No account found with this email. Please check your spelling or sign up.",
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password. Please try again.",
            });
        }

        // Issue tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Rotate refresh token in DB
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        setRefreshCookie(res, refreshToken);

        return res.status(200).json({
            success: true,
            message: "Welcome back! You have successfully logged in.",
            accessToken,
            user: user.toPublicJSON(),
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/logout
 * Requires: verifyAccessToken middleware
 */
const logout = async (req, res, next) => {
    try {
        // Clear refresh token from DB
        await User.findByIdAndUpdate(req.user.id, { refreshToken: null });

        // Clear cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "You have been logged out successfully.",
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/refresh-token
 * Requires: verifyRefreshToken middleware
 * Issues a new access token and rotates the refresh token
 */
const refreshToken = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found." });
        }

        // Rotate both tokens
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        setRefreshCookie(res, newRefreshToken);

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/auth/me
 * Requires: verifyAccessToken middleware
 */
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({
            success: true,
            user: user.toPublicJSON(),
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { signup, login, logout, refreshToken, getMe };
