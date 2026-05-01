import rateLimit from "express-rate-limit";

const rateLimitResponse = (req, res) => {
    res.status(429).json({ message: "Too many requests. Please try again later." });
};

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: rateLimitResponse,
    standardHeaders: true,
    legacyHeaders: false,
});

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    handler: (req, res) => {
        res.status(429).json({ message: "Too many login attempts. Try again in 15 minutes." });
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        res.status(429).json({ message: "Too many registration attempts. Try again in 1 hour." });
    },
    standardHeaders: true,
    legacyHeaders: false,
});
