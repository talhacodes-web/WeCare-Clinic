const env = require("dotenv");
env.config();

const config = {
    mongodbUri: process.env.MONGODB_URI,
    port: process.env.PORT || 3000,
    clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

    // JWT
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'dental_access_secret_change_in_prod',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dental_refresh_secret_change_in_prod',
    jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',

    // Nodemailer
    emailClientId: process.env.GOOGLE_CLIENT_ID,
    emailClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    emailRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    emailUser: process.env.GOOGLE_EMAIL_USER || process.env.EMAIL_USER,
    emailPass: process.env.GOOGLE_APP_PASSWORD || process.env.EMAIL_PASS,
    clinicName: process.env.CLINIC_NAME || 'WeCare Dental Clinic',
    clinicPhone: process.env.CLINIC_PHONE || '+1 (555) 234-5678',
    clinicAddress: process.env.CLINIC_ADDRESS || '123 Health Ave, Suite 400, New York, NY',
    frontendUrl: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
};

module.exports = config;