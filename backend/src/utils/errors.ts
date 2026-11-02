export class AppError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number,
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad request") {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

export class ConflictError extends AppError {
    constructor(message = "Resource already exists") {
        super(message, 409);
    }
}

export class InternalServerError extends AppError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}

export class ValidationError extends AppError {
    constructor(message = "Validation failed") {
        super(message, 400);
    }
}