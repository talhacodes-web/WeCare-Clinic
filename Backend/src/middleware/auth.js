const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");

/**
 * Middleware: Verify Access Token
 * Expects: Authorization: Bearer <access_token>
 * On success: attaches `req.user` with { id, email, role }
 */
const verifyAccessToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, config.jwtAccessSecret);

        // Attach user payload to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Access token has expired. Please refresh your session.",
                code: "TOKEN_EXPIRED",
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid access token.",
        });
    }
};

/**
 * Middleware: Verify Refresh Token
 * Expects: Cookie `refreshToken`
 * On success: attaches `req.user` and `req.refreshToken`
 */
const verifyRefreshToken = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Refresh token not found. Please log in again.",
            });
        }

        const decoded = jwt.verify(token, config.jwtRefreshSecret);

        // Verify the token is still stored in the DB (rotation check)
        const user = await User.findById(decoded.id).select("+refreshToken");
        if (!user || user.refreshToken !== token) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is invalid or has been revoked.",
            });
        }

        req.user = { id: user._id, email: user.email, role: user.role };
        req.refreshToken = token;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Refresh token is invalid or expired. Please log in again.",
        });
    }
};

/**
 * Middleware: Restrict to admin role only
 */
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access forbidden. Admin privileges required.",
        });
    }
    next();
};

module.exports = { verifyAccessToken, verifyRefreshToken, requireAdmin };
