import express from 'express';
import { authorize } from "../middleware/authMiddleware";
import { Roles } from "../constants";
import { createEvent, getEvents, getEvent, deleteEvent, updateEvent, attendEvent } from '../controllers/eventController';
const router = express.Router();

router.get("/", authorize([Roles.Member, Roles.Admin]), getEvents)
router.get("/:eventId", authorize([Roles.Member, Roles.Admin]), getEvent)
router.get("/admin/:eventId", authorize([Roles.Admin]), getEvent)
router.post("/", authorize([Roles.Admin]), createEvent)
router.patch("/:eventId/attend", authorize([Roles.Member, Roles.Admin]), attendEvent)
router.patch("/:eventId", authorize([Roles.Admin]), updateEvent)
router.delete("/admin/:eventId", authorize([Roles.Admin]), deleteEvent)


export default router;