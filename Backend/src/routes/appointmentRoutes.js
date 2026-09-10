const express = require("express");
const router = express.Router();

const {
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
    getAllAppointments,
} = require("../controllers/appointmentController");

const {
    verifyAccessToken,
    requireAdmin,
} = require("../middleware/auth");

// All appointment routes require authentication
router.use(verifyAccessToken);

// POST /api/appointments              — Book a new appointment
router.post("/", bookAppointment);

// GET  /api/appointments              — Get logged-in user's appointments
router.get("/", getMyAppointments);

// PUT  /api/appointments/:id/cancel   — Cancel an appointment (owner only)
router.put("/:id/cancel", cancelAppointment);

// GET  /api/appointments/all          — Admin: get all appointments
router.get("/all", requireAdmin, getAllAppointments);

module.exports = router;
