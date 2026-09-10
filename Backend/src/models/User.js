const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [100, "Name must not exceed 100 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // Never return password in queries by default
        },
        role: {
            type: String,
            enum: ["patient", "admin"],
            default: "patient",
        },
        refreshToken: {
            type: String,
            select: false, // Never return refresh token in queries by default
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving.
// NOTE: This hook is an `async` function, so Mongoose (v7+) does NOT pass a
// `next` callback — it awaits the returned promise instead. Calling next()
// here would throw "next is not a function". Just return / let it resolve.
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

// Instance method: compare plain password with stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Instance method: return safe public profile (no password, no refreshToken)
userSchema.methods.toPublicJSON = function () {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        role: this.role,
        createdAt: this.createdAt,
    };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
