"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMiddleware_1 = require("./errorMiddleware");
const authenticate = (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        if (!token) {
            throw new errorMiddleware_1.AuthenticationError("Token not found");
        }
        const jwtSecret = process.env.JWT_SECRET || "";
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!decoded || !decoded.userId || !decoded.userEmail) {
            throw new errorMiddleware_1.AuthenticationError("User not found");
        }
        const { userId, userEmail, roles } = decoded;
        req.user = { _id: userId, email: userEmail, roles };
        next();
    }
    catch (e) {
        throw new errorMiddleware_1.AuthenticationError("Invalid token Please log in again");
    }
};
exports.authenticate = authenticate;
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        var _a;
        const userRoles = (_a = req.user) === null || _a === void 0 ? void 0 : _a.roles;
        if (!userRoles ||
            !userRoles.some((role) => allowedRoles.includes(role))) {
            res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};
exports.authorize = authorize;
