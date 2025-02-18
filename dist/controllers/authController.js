"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.authenticateUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, roles } = req.body;
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        res.status(409).json({ message: "The user already exists" });
    }
    const user = yield User_1.default.create({
        name,
        email,
        password,
        roles,
    });
    if (user) {
        (0, auth_1.generateToken)(res, {
            userId: user._id,
            userEmail: user.email,
            roles: user.roles,
        });
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            timestamp: Date.now()
        });
    }
    else {
        throw new errorMiddleware_1.BadRequestError("An error occurred in registering the user");
    }
}));
exports.registerUser = registerUser;
const authenticateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (user && (yield user.comparePassword(password))) {
        (0, auth_1.generateToken)(res, {
            userId: user._id,
            userEmail: user.email,
            roles: user.roles,
        });
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            timestamp: Date.now()
        });
    }
    else {
        throw new errorMiddleware_1.AuthenticationError("User not found / password incorrect");
    }
}));
exports.authenticateUser = authenticateUser;
const logoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_1.clearToken)(res);
    res.status(200).json({ message: "User logged out" });
}));
exports.logoutUser = logoutUser;
