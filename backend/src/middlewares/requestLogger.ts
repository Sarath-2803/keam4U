// src/middleware/requestLogger.ts
// Logs request body, params, response time
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.js";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const level =
            res.statusCode >= 500 ? "error" :
            res.statusCode >= 400 ? "warn"  :
            "info";

        logger[level]("HTTP Request", {
            method:   req.method,
            url:      req.originalUrl,
            status:   res.statusCode,
            duration: `${duration}ms`,
            ip:       req.ip,
            // Only log body in non-production or for errors
            ...(process.env.NODE_ENV !== "production" || res.statusCode >= 400
                ? { body: req.body }
                : {}),
        });
    });

    next();
}