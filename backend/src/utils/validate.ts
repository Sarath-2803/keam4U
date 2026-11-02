import { type ZodSchema } from "zod";
import { ValidationError } from "./errors.js";
import logger from "../config/logger.js";

export const validate = <T>(schema: ZodSchema<T>, value: unknown): T => {
    const result = schema.safeParse(value);
    if (!result.success) {
        logger.error("Validation failed", { errors: result.error.issues });
        const message = result.error.issues.map((issue) => issue.message).join(", ");
        throw new ValidationError(message);
    }
    return result.data;
};