const ContactMessage = require("../models/ContactMessage");
const { sendContactMessageEmail, sendContactAcknowledgmentEmail } = require("../services/emailService");

/**
 * POST /api/contact
 * Public endpoint to submit a contact inquiry from the website
 */
const submitContact = async (req, res, next) => {
    try {
        const { fullName, email, phone, subject, message } = req.body;

        // Basic validation
        if (!fullName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please provide your full name, email, and message.",
            });
        }

        // Email format check
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address.",
            });
        }

        // Store contact message in database (resilient to DB connection issues)
        let contactRecord = null;
        try {
            contactRecord = await ContactMessage.create({
                fullName: fullName.trim(),
                email: email.toLowerCase().trim(),
                phone: phone ? phone.trim() : "",
                subject: subject ? subject.trim() : "General Inquiry",
                message: message.trim(),
            });
        } catch (dbErr) {
            console.warn("[Contact] Note: Could not save contact record to DB:", dbErr.message);
        }

        // Send email to clinic doctor/admin (non-blocking)
        sendContactMessageEmail({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone ? phone.trim() : "",
            subject: subject ? subject.trim() : "General Inquiry",
            message: message.trim(),
        }).catch((err) => {
            console.error("[Contact] Error forwarding contact message to clinic email:", err.message || err);
        });

        // Send confirmation copy to the patient (non-blocking)
        sendContactAcknowledgmentEmail({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            subject: subject ? subject.trim() : "General Inquiry",
        }).catch((err) => {
            console.error("[Contact] Error sending confirmation email to visitor:", err.message || err);
        });

        return res.status(200).json({
            success: true,
            message: "Thank you for contacting WeCare Clinic! Your message has been delivered.",
            contactId: contactRecord?._id || null,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    submitContact,
};
