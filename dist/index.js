"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("../src/routes/authRouter"));
const userDB_1 = __importDefault(require("../src/connections/userDB"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authMiddleware_1 = require("../src/middleware/authMiddleware");
const errorMiddleware_1 = require("../src/middleware/errorMiddleware");
const userRouter_1 = __importDefault(require("../src/routes/userRouter"));
const eventRouter_1 = __importDefault(require("../src/routes/eventRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const allowedOrigin = process.env.ALLOWED_ORIGIN;
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(authRouter_1.default);
app.use("/users", authMiddleware_1.authenticate, userRouter_1.default);
app.use("/events", authMiddleware_1.authenticate, eventRouter_1.default);
app.use(errorMiddleware_1.errorHandler);
(0, userDB_1.default)();
module.exports = app;
