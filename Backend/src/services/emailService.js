const nodemailer = require('nodemailer');
const config = require('../config/config');

/**
 * Initialize nodemailer transporter based on available configuration.
 * Supports both Gmail App Password (recommended for stability) and OAuth2.
 */
const createTransporter = () => {
    // 1. Check if standard Gmail App Password is provided
    if (config.emailUser && config.emailPass) {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailUser,
                pass: config.emailPass,
            },
        });
    }

    // 2. Check if OAuth2 credentials are provided
    if (config.emailUser && config.emailClientId && config.emailClientSecret && config.emailRefreshToken) {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: config.emailUser,
                clientId: config.emailClientId,
                clientSecret: config.emailClientSecret,
                refreshToken: config.emailRefreshToken,
            },
        });
    }

    console.warn('[EmailService] Warning: Email credentials are not fully configured.');
    return null;
};

const transporter = createTransporter();

// Verify connection configuration on startup (non-blocking)
if (transporter) {
    transporter.verify((error) => {
        if (error) {
            console.error('[EmailService] Transporter verification failed:', error.message);
            if (error.message && error.message.includes('invalid_grant')) {
                console.warn(
                    '[EmailService] Google OAuth2 "invalid_grant" detected. ' +
                    'The refresh token may have expired or is mismatched with the Client ID. ' +
                    'Tip: Use a 16-character Google App Password (set GOOGLE_APP_PASSWORD in .env) for instant and reliable access.'
                );
            }
        } else {
            console.log('[EmailService] Email transporter verified and ready to send messages.');
        }
    });
}

/**
 * Generic sendEmail function with robust error catching and optional replyTo support.
 */
const sendEmail = async (to, subject, text, html, replyTo = null) => {
    if (!transporter) {
        console.warn(`[EmailService] Cannot send email to ${to}: Transporter is not configured.`);
        return { success: false, error: 'Email transporter not configured' };
    }

    const mailOptions = {
        from: `"${config.clinicName}" <${config.emailUser}>`,
        to,
        subject,
        text,
        html,
        ...(replyTo ? { replyTo } : {}),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[EmailService] Email sent successfully to ${to} (Message ID: ${info.messageId})`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`[EmailService] Failed to send email to ${to}:`, error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Send Welcome Email to newly registered patients
 */
const sendWelcomeEmail = async (user) => {
    const userName = user.name || 'Valued Patient';
    const recipientEmail = user.email;

    const subject = `Welcome to ${config.clinicName}! Your Smile Journey Begins Here`;

    const textContent = `
Hello ${userName},

Welcome to ${config.clinicName}! We are thrilled to have you as part of our patient family.

Your account has been created successfully. You can now easily browse dental services, book appointments with our certified specialists, and manage your health schedule anytime.

Getting Started:
- Book an Appointment: Visit ${config.frontendUrl}/appointments
- Explore Services: Dental cleaning, teeth whitening, orthodontics, emergency dental care, and more.

Clinic Information:
- Phone: ${config.clinicPhone}
- Address: ${config.clinicAddress}
- Support: ${config.emailUser}

Thank you for choosing ${config.clinicName}!
Warm regards,
The Dental Care Team
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${config.clinicName}</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1f2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" max-width="600" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%); padding: 36px 30px; text-align: center;">
              <div style="font-size: 40px; margin-bottom: 8px;">🦷</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
                ${config.clinicName}
              </h1>
              <p style="color: #e0f2fe; margin: 8px 0 0; font-size: 15px; font-weight: 400;">
                Excellence in Gentle Dental Care & Smile Design
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 30px;">
              <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 14px;">
                Welcome, ${userName}! 👋
              </h2>
              <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.6; color: #4b5563;">
                Thank you for creating an account with <strong>${config.clinicName}</strong>. We are delighted to welcome you to our community of happy, healthy smiles!
              </p>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #4b5563;">
                With your new account, scheduling appointments, consulting with certified dental specialists, and tracking your oral healthcare is now simpler than ever.
              </p>

              <!-- Feature Highlights Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                      What You Can Do Now:
                    </div>
                    <div style="margin-bottom: 10px; font-size: 14px; color: #334155;">
                      📅 <strong>Instant Online Booking:</strong> Choose your doctor, preferred date, and time slot seamlessly.
                    </div>
                    <div style="margin-bottom: 10px; font-size: 14px; color: #334155;">
                      ✨ <strong>Comprehensive Services:</strong> From preventive cleanings and whitening to cosmetic dentistry and root canals.
                    </div>
                    <div style="font-size: 14px; color: #334155;">
                      📋 <strong>Appointment Management:</strong> View and track upcoming consultations right from your patient dashboard.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button -->
              <div style="text-align: center; margin: 30px 0 24px;">
                <a href="${config.frontendUrl}/appointments" style="display: inline-block; background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; padding: 14px 34px; border-radius: 8px; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);">
                  Book Your First Appointment
                </a>
              </div>

              <!-- Contact Box -->
              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px; font-size: 13px; color: #6b7280; line-height: 1.5;">
                <strong style="color: #374151;">Need assistance?</strong><br>
                📞 Phone: ${config.clinicPhone}<br>
                📍 Location: ${config.clinicAddress}<br>
                ✉️ Email: <a href="mailto:${config.emailUser}" style="color: #0284c7; text-decoration: none;">${config.emailUser}</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #f3f4f6;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                &copy; ${new Date().getFullYear()} ${config.clinicName}. All rights reserved.<br>
                You received this email because you registered at ${config.clinicName}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    return sendEmail(recipientEmail, subject, textContent, htmlContent);
};

/**
 * Send Appointment Confirmation Email
 */
const sendAppointmentConfirmationEmail = async (appointment, user) => {
    const userName = user.name || appointment.patientName || 'Valued Patient';
    const recipientEmail = user.email || appointment.email;

    const subject = `Appointment Confirmation - ${config.clinicName}`;

    const textContent = `
Hello ${userName},

Your appointment request has been received successfully!

Appointment Details:
- Service: ${appointment.serviceName}
- Doctor: ${appointment.dentistName}
- Date: ${appointment.date}
- Time: ${appointment.time}
- Status: ${appointment.status.toUpperCase()}

If you have any questions or need to reschedule, please visit your dashboard or call us at ${config.clinicPhone}.

Warm regards,
${config.clinicName}
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Appointment Confirmation</title></head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" style="background-color:#f3f4f6; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <tr>
            <td style="background:#0d9488; padding:24px; text-align:center; color:#ffffff;">
              <h2 style="margin:0; font-size:22px;">Appointment Confirmed 🦷</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <p style="font-size:15px; color:#374151;">Dear <strong>${userName}</strong>,</p>
              <p style="font-size:14px; color:#4b5563;">Your appointment request has been recorded. Below are your appointment details:</p>
              
              <div style="background:#f0fdfa; border:1px solid #ccfbf1; border-radius:8px; padding:16px; margin:18px 0;">
                <p style="margin:4px 0; font-size:14px;"><strong>Service:</strong> ${appointment.serviceName}</p>
                <p style="margin:4px 0; font-size:14px;"><strong>Doctor:</strong> ${appointment.dentistName}</p>
                <p style="margin:4px 0; font-size:14px;"><strong>Date:</strong> ${appointment.date}</p>
                <p style="margin:4px 0; font-size:14px;"><strong>Time:</strong> ${appointment.time}</p>
                <p style="margin:4px 0; font-size:14px;"><strong>Status:</strong> <span style="color:#0d9488; font-weight:600; text-transform:uppercase;">${appointment.status}</span></p>
              </div>

              <p style="font-size:13px; color:#6b7280; margin-top:20px;">
                Need to make changes? You can view or cancel your appointment in your <a href="${config.frontendUrl}/appointments" style="color:#0284c7;">dashboard</a> or call us at ${config.clinicPhone}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    return sendEmail(recipientEmail, subject, textContent, htmlContent);
};

/**
 * Send Contact Message notification to clinic doctor / admin email
 */
const sendContactMessageEmail = async ({ fullName, email, phone, subject, message }) => {
    const adminEmail = config.emailUser;
    const inquirySubject = `[Website Contact] ${subject ? subject : 'New Patient Inquiry'} - ${fullName}`;

    const textContent = `
New Contact Inquiry Received

Patient Details:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Subject: ${subject || 'General Inquiry'}

Message:
${message}

---
You can reply directly to this email to contact ${fullName}.
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Contact Inquiry</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f1f5f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border:1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
              <div style="font-size: 36px; margin-bottom: 6px;">📬</div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                New Website Inquiry
              </h1>
              <p style="margin: 6px 0 0; font-size: 14px; color: #e0f2fe;">
                ${config.clinicName} &bull; Contact Form
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px 26px;">
              <p style="margin: 0 0 16px; font-size: 15px; color: #475569;">
                A visitor has submitted a message via your dental clinic contact page:
              </p>

              <!-- Patient Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 22px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="margin-bottom: 8px; font-size: 14px; color: #334155;">
                      <strong>👤 Full Name:</strong> ${fullName}
                    </div>
                    <div style="margin-bottom: 8px; font-size: 14px; color: #334155;">
                      <strong>✉️ Email Address:</strong> <a href="mailto:${email}" style="color: #0284c7; text-decoration: underline;">${email}</a>
                    </div>
                    <div style="margin-bottom: 8px; font-size: 14px; color: #334155;">
                      <strong>📞 Phone:</strong> ${phone ? `<a href="tel:${phone}" style="color: #0284c7;">${phone}</a>` : '<span style="color:#94a3b8;">Not provided</span>'}
                    </div>
                    <div style="font-size: 14px; color: #334155;">
                      <strong>📌 Subject:</strong> ${subject || 'General Inquiry'}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Message Content -->
              <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 8px;">
                Message:
              </div>
              <div style="background-color: #f0fdfa; border-left: 4px solid #0d9488; border-radius: 4px; padding: 18px 20px; font-size: 15px; line-height: 1.6; color: #0f172a; white-space: pre-wrap; margin-bottom: 24px;">
${message}
              </div>

              <!-- Action Link -->
              <div style="text-align: center; margin-top: 20px;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your Inquiry to WeCare Clinic')}" style="display: inline-block; background: #0d9488; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 12px 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(13, 148, 136, 0.25);">
                  Reply to ${fullName}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
              Direct reply-to is configured for <strong>${email}</strong>.<br>
              &copy; ${new Date().getFullYear()} ${config.clinicName}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    return sendEmail(adminEmail, inquirySubject, textContent, htmlContent, email);
};

/**
 * Send Acknowledgment Email to the patient who submitted the contact form
 */
const sendContactAcknowledgmentEmail = async ({ fullName, email, subject }) => {
    const confirmationSubject = `We've received your message - ${config.clinicName}`;

    const textContent = `
Hello ${fullName},

Thank you for contacting ${config.clinicName}! We have received your inquiry regarding "${subject || 'General Dental Inquiry'}".

Our patient coordination team will review your message and reach out to you within 24 hours.

If you have an urgent dental emergency, please call us directly at ${config.clinicPhone}.

Warm regards,
${config.clinicName}
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Message Received</title></head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1e293b;">
  <table role="presentation" width="100%" style="background-color:#f1f5f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <tr>
            <td style="background:#0d9488; padding:24px; text-align:center; color:#ffffff;">
              <h2 style="margin:0; font-size:22px;">Message Received 🦷</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 20px;">
              <p style="font-size:15px; color:#334155;">Hello <strong>${fullName}</strong>,</p>
              <p style="font-size:14px; color:#475569; line-height:1.6;">
                Thank you for reaching out to <strong>${config.clinicName}</strong>. We have received your message regarding <em>${subject || 'General Inquiry'}</em>.
              </p>
              <p style="font-size:14px; color:#475569; line-height:1.6;">
                Our patient care coordinator is reviewing your inquiry and will contact you promptly (usually within 24 business hours).
              </p>
              <div style="background:#f0fdfa; border:1px solid #ccfbf1; border-radius:8px; padding:14px; margin:20px 0; font-size:13px; color:#0f766e;">
                🚨 <strong>Need Immediate Emergency Care?</strong><br>
                Please call our urgent care line at <strong>${config.clinicPhone}</strong>.
              </div>
              <p style="font-size:13px; color:#64748b; margin-top:20px;">
                Warm regards,<br>
                <strong>${config.clinicName} Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    return sendEmail(email, confirmationSubject, textContent, htmlContent);
};

module.exports = {
    sendEmail,
    sendWelcomeEmail,
    sendAppointmentConfirmationEmail,
    sendContactMessageEmail,
    sendContactAcknowledgmentEmail,
};