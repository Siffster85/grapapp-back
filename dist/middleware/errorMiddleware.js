"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = exports.BadRequestError = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof AuthenticationError) {
        res.status(401).json({ message: "Unauthorized: " + err.message });
    }
    else if (err instanceof BadRequestError) {
        res.status(400).json({ message: err.message || "Request failed" });
    }
    else {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.errorHandler = errorHandler;
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
    }
}
exports.AuthenticationError = AuthenticationError;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
    }
}
exports.BadRequestError = BadRequestError;
