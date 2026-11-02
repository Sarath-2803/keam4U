// src/config/morgan.ts  — HTTP request logging
import morgan from "morgan";
import logger from "./logger.js";
import { StreamOptions } from "morgan";

// npm install morgan @types/morgan
const stream: StreamOptions = {
    write: (message) => logger.info(message.trim()),
};

const morganMiddleware = morgan(
    process.env.NODE_ENV === "production"
        ? "combined"  // Apache combined format in prod
        : "dev",      // colored short format in dev
    { stream }
);

export default morganMiddleware;