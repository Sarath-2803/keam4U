import type { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { AppError, NotFoundError } from "../utils/errors.js";
import logger from "../config/logger.js";

type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown>;

export const asyncHandler = (handler: AsyncHandler): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`));
};

const errorHandler: ErrorRequestHandler = (error: unknown, req: Request, res: Response, _next: NextFunction) => {
    let statusCode = 500;
    let message = "Internal server error";
    let details: unknown;

    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    } else if (error instanceof MongooseError.ValidationError) {
        statusCode = 400;
        message = "Validation failed";
        details = Object.values(error.errors).map((err) => ({
            message: err.message,
            path: err.path,
            value: err.value,
        }));
    } else if (error instanceof MongooseError.CastError) {
        statusCode = 400;
        message = `Invalid value for field: ${error.path}`;
    } else if ((error as { code?: number })?.code === 11000) {
        // MongoDB duplicate key error
        statusCode = 409;
        message = "Resource already exists";
        details = (error as { keyValue?: unknown }).keyValue;
    } else if (error instanceof SyntaxError && "body" in error) {
        statusCode = 400;
        message = "Invalid JSON payload";
    } else if (error instanceof Error) {
        message = error.message || message;
    }

    const logPayload = {
        message,
        statusCode,
        path: req.originalUrl,
        method: req.method,
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
    };

    if (statusCode >= 500) {
        logger.error("Unhandled error:", logPayload);
    } else {
        logger.warn("Request error:", logPayload);
    }

    const response: Record<string, unknown> = {
        success: false,
        message,
    };

    if (details) {
        response.details = details;
    }

    if (process.env.NODE_ENV === "development" && error instanceof Error) {
        response.stack = error.stack;
        response.error = {
            name: error.name,
            message: error.message,
        };
    }

    res.status(statusCode).json(response);
};

export default errorHandler;