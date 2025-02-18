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
exports.attendEvent = exports.updateEvent = exports.deleteEvent = exports.getEvent = exports.getEvents = exports.createEvent = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const getEvents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield Event_1.default.find({}, "name description startDateTime endDateTime capacity attendees");
    res.status(200).json(events.map((event) => {
        return { id: event._id, name: event.name, description: event.description, startDateTime: event.startDateTime, endDateTime: event.endDateTime, capacity: event.capacity, attendees: event.attendees };
    }));
}));
exports.getEvents = getEvents;
const getEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const event = yield Event_1.default.findById(eventId, "name description startDateTime endDateTime capacity attendees");
    if (!event) {
        throw new errorMiddleware_1.BadRequestError("Event not available");
    }
    res.status(200).json(event);
}));
exports.getEvent = getEvent;
const createEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, startDateTime, endDateTime, capacity, attendees } = req.body;
    const event = yield Event_1.default.create({
        name,
        description,
        startDateTime,
        endDateTime,
        capacity,
        attendees,
    });
    if (event) {
        res.status(201).json({
            id: event._id,
            name: event.name,
            description: event.description,
            startDateTime: event.startDateTime,
            endDateTime: event.endDateTime,
            capacity: event.capacity,
            attendees: event.attendees,
        });
    }
    else {
        throw new errorMiddleware_1.BadRequestError("An error occurred creating this event");
    }
}));
exports.createEvent = createEvent;
const deleteEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const event = yield Event_1.default.findByIdAndDelete(eventId);
    if (!event) {
        throw new errorMiddleware_1.BadRequestError("Event not available");
    }
    res.status(200).json(event);
}));
exports.deleteEvent = deleteEvent;
const updateEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const payload = req.body;
    const event = yield Event_1.default.findById(eventId);
    if (!event) {
        throw new errorMiddleware_1.BadRequestError("Event not available");
    }
    const updatedEvent = yield Event_1.default.findByIdAndUpdate(eventId, payload, { new: true });
    if (!updatedEvent) {
        throw new Error('Event not found');
    }
    res.status(200).json(updatedEvent);
}));
exports.updateEvent = updateEvent;
const attendEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const eventId = req.params.eventId;
    const payload = req.body.payload;
    let userId = "";
    if (req.body.payload.$push) {
        userId = req.body.payload.$push.attendees;
    }
    const event = yield Event_1.default.findById(eventId);
    if ((_a = event === null || event === void 0 ? void 0 : event.attendees) === null || _a === void 0 ? void 0 : _a.includes(userId)) {
        throw new Error("Already Attending");
    }
    const updatedEvent = yield Event_1.default.findByIdAndUpdate(eventId, payload, { new: true });
    if (!updatedEvent) {
        throw new Error('Event not found');
    }
    res.status(200).json(updatedEvent);
}));
exports.attendEvent = attendEvent;
