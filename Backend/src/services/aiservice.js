const { GoogleGenAI } = require("@google/genai");
const config = require("../config/config");
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 12;

const clinicKnowledge = `
CLINIC
- Name: WeCare Clinic. Tagline: Your Smile, Our Care.
- Phone: +1 (555) 382-7200. Emergency phone: +1 (555) 911-3368.
- Email: care@wecareclinic.com.
- Address: 452 Healthview Parkway, Suite 300, Medical Plaza, CA 90210.
- Hours: Monday-Friday 8:00 AM-7:00 PM; Saturday 9:00 AM-4:00 PM; Sunday closed with emergency on-call service.

SERVICES
- General Dentistry: examinations, cleanings, fillings, fluoride, and preventive care. Typical duration: 45 minutes.
- Cosmetic Dentistry: veneers, bonding, gum contouring, and smile makeovers. Typical duration: 60 minutes.
- Orthodontics: clear aligners, ceramic or metal braces, bite correction, and retainers. Typical duration: 45 minutes.
- Teeth Whitening: in-office LED whitening and take-home trays. Typical duration: 60 minutes.
- Dental Implants: computer-guided titanium implants and zirconia crowns. Typical duration: 90 minutes.
- Root Canal Treatment: gentle treatment for infected or damaged teeth. Typical duration: 60 minutes.
- Pediatric Dentistry: child-friendly examinations, cleanings, sealants, fluoride, and growth monitoring. Typical duration: 30 minutes.
- Gum Care (Periodontics): deep scaling, root planing, gum inflammation treatment, and pocket monitoring. Typical duration: 50 minutes.

DENTISTS
- Dr. Sarah Ahmed: lead general and preventive dentist, available Monday-Friday.
- Dr. Ali Hassan: board-certified orthodontist, available Monday, Wednesday, Friday, and Saturday.
- Dr. Ayesha Khan: cosmetic and restorative specialist, available Tuesday, Thursday, Friday, and Saturday.
- Dr. Michael Chen: endodontics and implantologist, available Monday, Tuesday, and Thursday.

WEBSITE WORKFLOWS AND ROUTES
- Home (/): clinic overview, services, doctors, tools, testimonials, and booking call-to-action.
- About (/about): clinic values, experience, technology, and care approach.
- Services (/services): browse services and open service details.
- Book appointment (/book-appointment): sign up or log in, choose a service, dentist, date, and time, then submit the appointment request.
- Contact (/contact): send a message with name, email, optional phone, subject, and message.
- Login (/login) and Signup (/signup): patient authentication.
- Authenticated patients can open My Appointments to view their appointments and cancel eligible appointments.
- API POST /api/auth/signup and POST /api/auth/login create a session and return an access token.
- API GET /api/auth/me returns the signed-in patient. POST /api/auth/logout ends the session. POST /api/auth/refresh-token refreshes it.
- API POST /api/appointments creates an appointment and requires authentication.
- API GET /api/appointments lists the signed-in patient's appointments.
- API PUT /api/appointments/:id/cancel cancels an owned pending or confirmed appointment. Completed appointments cannot be cancelled.
- API POST /api/contact submits a contact inquiry.
- API GET /api/health reports whether the backend is running.

BOOKING REQUIREMENTS
Patients need an account and must provide serviceId, serviceName, dentistId, dentistName, date, and time. An optional reason can be included. New requests start with pending status. The booking confirmation email is sent asynchronously when email is configured.
`;

const systemInstruction = `You are the helpful website assistant for WeCare Clinic.

Use only the clinic knowledge below. Never invent prices, insurance policies, availability, diagnoses, credentials, or services. The website does not publish prices or live slot availability, so direct users to the booking page or clinic contact details for those questions.

You may explain general dental concepts, but you are not a dentist and must not diagnose, prescribe, or promise a treatment outcome. For symptoms, give general safety guidance and recommend an appointment. For severe swelling, trouble breathing or swallowing, uncontrolled bleeding, facial trauma, or other urgent danger, tell the user to call emergency services immediately and contact the clinic emergency phone. Do not delay emergency care.

Answer the user's actual question first. Be concise, friendly, and practical. When explaining website actions, use the exact route and tell the user whether login is required. If the requested information is not in the knowledge, say that clearly and provide the clinic phone, email, or contact page. Return plain text only: do not use Markdown, bullets, numbered lists, asterisks, hashtags, backticks, or decorative symbols. Use short paragraphs and line breaks when several items need to be shown.

${clinicKnowledge}`;

function cleanHistory(history) {
    if (!Array.isArray(history)) return [];

    return history
        .slice(-MAX_HISTORY_MESSAGES)
        .filter((entry) => entry && ["user", "model"].includes(entry.role))
        .map((entry) => ({
            role: entry.role,
            parts: [{ text: String(entry.content || entry.text || "").slice(0, MAX_MESSAGE_LENGTH) }],
        }))
        .filter((entry) => entry.parts[0].text.trim());
}

function isEmergency(message) {
    return /trouble\s+(breathing|swallowing)|can't\s+(breathe|swallow)|uncontrolled\s+bleeding|severe\s+(swelling|facial\s+trauma)|facial\s+trauma/i.test(message);
}

function formatAssistantResponse(response) {
    return String(response)
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        .replace(/`{1,3}/g, "")
        .replace(/^\s{0,3}#{1,6}\s*/gm, "")
        .replace(/^\s*(?:[-*+]\s+|\d+[.)]\s+)/gm, "")
        .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, "$1")
        .replace(/_{1,3}([^_\n]+)_{1,3}/g, "$1")
        .replace(/^[ \t]+/gm, "")
        .replace(/[ \t]+$/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

async function askAI(message, history = []) {
    if (!config.gemeniApiKey) {
        const error = new Error("AI assistant is not configured. Please contact the clinic directly.");
        error.statusCode = 503;
        throw error;
    }

    const ai = new GoogleGenAI({ apiKey: config.gemeniApiKey });
    const contents = [
        ...cleanHistory(history),
        { role: "user", parts: [{ text: message.trim() }] },
    ];

    const response = await ai.models.generateContent({
        model: MODEL,
        contents,
        config: {
            systemInstruction,
            temperature: 0.2,
            maxOutputTokens: 700,
        },
    });

    const answer = typeof response.text === "function" ? response.text() : response.text;
    if (!answer || !String(answer).trim()) {
        throw new Error("The AI assistant returned an empty response.");
    }

    return formatAssistantResponse(answer);
}

function getEmergencyResponse() {
    return "This may be an emergency. If you are having trouble breathing or swallowing, have uncontrolled bleeding, severe swelling, or facial trauma, call emergency services immediately. You can also call WeCare Clinic's emergency line at +1 (555) 911-3368. Do not wait for an online response.";
}

module.exports = {
    askAI,
    formatAssistantResponse,
    getEmergencyResponse,
    isEmergency,
    MAX_MESSAGE_LENGTH,
    MAX_HISTORY_MESSAGES,
};