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
exports.deleteUser = exports.getUsers = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const user = yield User_1.default.findById(userId, "name email");
    if (!user) {
        throw new errorMiddleware_1.BadRequestError("User not available");
    }
    res.status(200).json(user);
}));
exports.getUser = getUser;
const getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({}, "name email roles");
    res.status(200).json(users.map((user) => {
        return { id: user._id, name: user.name, email: user.email, roles: user.roles[0] };
    }));
}));
exports.getUsers = getUsers;
const deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const event = yield User_1.default.findByIdAndDelete(userId);
    if (!event) {
        throw new errorMiddleware_1.BadRequestError("Event not available");
    }
    res.status(200).json(event);
}));
exports.deleteUser = deleteUser;
