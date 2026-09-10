/**
 * Global Error Handler Middleware
 * Must be mounted LAST in app.js: app.use(errorHandler)
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = null;

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed.";
        errors = Object.values(err.errors).map((e) => ({
            field: e.path,
            message: e.message,
        }));
    }

    // Mongoose duplicate key error (e.g. duplicate email)
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue || {})[0] || "field";
        message = `An account with this ${field} already exists.`;
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid value for field '${err.path}'.`;
    }

    // JWT errors (should normally be caught in middleware, but just in case)
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token.";
    }
    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token has expired.";
    }

    // Don't expose internals in production
    if (process.env.NODE_ENV === "production" && statusCode === 500) {
        message = "Something went wrong. Please try again later.";
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV !== "production" && statusCode === 500 && { stack: err.stack }),
    });
};

module.exports = errorHandler;
