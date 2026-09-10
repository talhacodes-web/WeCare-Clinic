const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Patient reference is required"],
        },
        patientName: {
            type: String,
            required: [true, "Patient name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        serviceId: {
            type: String,
            required: [true, "Service ID is required"],
            trim: true,
        },
        serviceName: {
            type: String,
            required: [true, "Service name is required"],
            trim: true,
        },
        dentistId: {
            type: String,
            required: [true, "Dentist ID is required"],
            trim: true,
        },
        dentistName: {
            type: String,
            required: [true, "Dentist name is required"],
            trim: true,
        },
        date: {
            type: String, // Stored as "YYYY-MM-DD" to match frontend format
            required: [true, "Appointment date is required"],
        },
        time: {
            type: String, // Stored as "HH:MM AM/PM" to match frontend format
            required: [true, "Appointment time is required"],
        },
        reason: {
            type: String,
            trim: true,
            maxlength: [500, "Reason must not exceed 500 characters"],
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

// Index for fast per-user appointment lookups
appointmentSchema.index({ patientId: 1, createdAt: -1 });
appointmentSchema.index({ email: 1 });

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
