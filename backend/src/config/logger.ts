// src/config/logger.ts
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// ── Custom format for console (readable) ────────────────────────────
const consoleFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : "";
    return `${timestamp} [${level}]: ${stack ?? message}${metaStr}`;
});

// ── Custom format for file (structured JSON) ────────────────────────
const fileFormat = combine(
    timestamp(),
    errors({ stack: true }),
    json()
);

// ── Transports ───────────────────────────────────────────────────────
const transports: winston.transport[] = [
    // Console — always on, colored in dev
    new winston.transports.Console({
        format: combine(
            colorize(),
            timestamp({ format: "HH:mm:ss.SSS" }),
            errors({ stack: true }),
            consoleFormat
        ),
    }),

    // Error log — errors only, rotated daily, kept 30 days
    new DailyRotateFile({
        filename:     "logs/error-%DATE%.log",
        datePattern:  "YYYY-MM-DD",
        level:        "error",
        maxFiles:     "30d",
        maxSize:      "10m",
        format:       fileFormat,
    }),

    // Combined log — everything, rotated daily, kept 14 days
    new DailyRotateFile({
        filename:     "logs/combined-%DATE%.log",
        datePattern:  "YYYY-MM-DD",
        maxFiles:     "14d",
        maxSize:      "20m",
        format:       fileFormat,
    }),
];

const logger = winston.createLogger({
    level:      process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
    transports,
    // Don't crash on unhandled errors in logger itself
    exitOnError: false,
});

export default logger;