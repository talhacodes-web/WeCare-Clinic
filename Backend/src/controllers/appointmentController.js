const Appointment = require("../models/Appointment");
const User = require("../models/User");
const { sendAppointmentConfirmationEmail } = require("../services/emailService");

/**
 * POST /api/appointments
 * Book a new appointment (authenticated patients only)
 */
const bookAppointment = async (req, res, next) => {
    try {
        const {
            serviceId,
            serviceName,
            dentistId,
            dentistName,
            date,
            time,
            reason,
        } = req.body;

        if (!serviceId || !serviceName || !dentistId || !dentistName || !date || !time) {
            return res.status(400).json({
                success: false,
                message: "Please provide serviceId, serviceName, dentistId, dentistName, date, and time.",
            });
        }

        // Fetch user to fill in patient details from their profile
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const appointment = await Appointment.create({
            patientId: user._id,
            patientName: user.name,
            email: user.email,
            phone: user.phone,
            serviceId,
            serviceName,
            dentistId,
            dentistName,
            date,
            time,
            reason: reason || "",
            status: "pending",
        });

        // Send appointment confirmation email (non-blocking)
        sendAppointmentConfirmationEmail(appointment, user).catch((emailErr) => {
            console.error("[Appointment] Error sending confirmation email:", emailErr?.message || emailErr);
        });

        return res.status(201).json({
            success: true,
            message: "Appointment request submitted successfully!",
            appointment,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/appointments
 * Get all appointments for the logged-in patient
 * Also supports ?email= query param for backward compatibility with frontend
 */
const getMyAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user.id })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /api/appointments/:id/cancel
 * Cancel an appointment (only the owning patient can cancel)
 */
const cancelAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found.",
            });
        }

        // Ownership check
        if (appointment.patientId.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to cancel this appointment.",
            });
        }

        if (appointment.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "This appointment is already cancelled.",
            });
        }

        if (appointment.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Completed appointments cannot be cancelled.",
            });
        }

        appointment.status = "cancelled";
        await appointment.save();

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully.",
            appointment,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/appointments/all
 * Admin only: get all appointments with patient info populated
 */
const getAllAppointments = async (req, res, next) => {
    try {
        const { status, date } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (date) filter.date = date;

        const appointments = await Appointment.find(filter)
            .populate("patientId", "name email phone")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
    getAllAppointments,
};
