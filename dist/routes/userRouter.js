"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const constants_1 = require("../constants");
const router = express_1.default.Router();
router.get("/:id", (0, authMiddleware_1.authorize)([constants_1.Roles.Member, constants_1.Roles.Admin]), userController_1.getUser);
router.get("/", (0, authMiddleware_1.authorize)([constants_1.Roles.Admin]), userController_1.getUsers);
router.delete("/user-admin/:id", (0, authMiddleware_1.authorize)([constants_1.Roles.Admin]), userController_1.deleteUser);
exports.default = router;
