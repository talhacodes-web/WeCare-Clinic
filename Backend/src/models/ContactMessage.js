const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            maxlength: [100, "Name must not exceed 100 characters"],
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address",
            ],
        },
        phone: {
            type: String,
            trim: true,
            default: "",
        },
        subject: {
            type: String,
            trim: true,
            default: "General Inquiry",
            maxlength: [150, "Subject must not exceed 150 characters"],
        },
        message: {
            type: String,
            required: [true, "Message content is required"],
            trim: true,
            maxlength: [2000, "Message must not exceed 2000 characters"],
        },
        status: {
            type: String,
            enum: ["unread", "read", "replied"],
            default: "unread",
        },
    },
    {
        timestamps: true,
    }
);

contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ email: 1 });

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

module.exports = ContactMessage;
