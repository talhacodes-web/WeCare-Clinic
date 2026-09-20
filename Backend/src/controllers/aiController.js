const {
    askAI,
    getEmergencyResponse,
    isEmergency,
    MAX_MESSAGE_LENGTH,
    MAX_HISTORY_MESSAGES,
} = require("../services/aiservice");

/**
 * POST /api/ai/chat
 * Public website assistant. Authentication is optional.
 */
const chatWithAI = async (req, res, next) => {
    try {
        const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
        const history = Array.isArray(req.body?.history) ? req.body.history : [];

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Please provide a message.",
            });
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
            return res.status(400).json({
                success: false,
                message: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.`,
            });
        }

        if (history.length > MAX_HISTORY_MESSAGES * 2) {
            return res.status(400).json({
                success: false,
                message: `Conversation history must not exceed ${MAX_HISTORY_MESSAGES * 2} messages.`,
            });
        }

        const answer = isEmergency(message)
            ? getEmergencyResponse()
            : await askAI(message, history);

        return res.status(200).json({
            success: true,
            answer,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { chatWithAI };