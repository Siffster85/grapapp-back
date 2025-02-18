"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const constants_1 = require("../constants");
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
router.get("/", (0, authMiddleware_1.authorize)([constants_1.Roles.Member, constants_1.Roles.Admin]), eventController_1.getEvents);
router.get("/:eventId", (0, authMiddleware_1.authorize)([constants_1.Roles.Member, constants_1.Roles.Admin]), eventController_1.getEvent);
router.get("/admin/:eventId", (0, authMiddleware_1.authorize)([constants_1.Roles.Admin]), eventController_1.getEvent);
router.post("/", (0, authMiddleware_1.authorize)([constants_1.Roles.Admin]), eventController_1.createEvent);
router.patch("/:eventId/attend", (0, authMiddleware_1.authorize)([constants_1.Roles.Member, constants_1.Roles.Admin]), eventController_1.attendEvent);
router.patch("/:eventId", (0, authMiddleware_1.authorize)([constants_1.Roles.Admin]), eventController_1.updateEvent);
router.delete("/admin/:eventId", (0, authMiddleware_1.authorize)([constants_1.Roles.Admin]), eventController_1.deleteEvent);
exports.default = router;
