import express from "express";
import { getUser, getUsers, deleteUser } from "../controllers/userController";
import { authorize } from "../middleware/authMiddleware";
import { Roles } from "../constants";

const router = express.Router();

router.get("/:id", authorize([Roles.Member, Roles.Admin]), getUser);
router.get("/", authorize([Roles.Admin]), getUsers);
router.delete("/user-admin/:id", authorize([Roles.Admin]), deleteUser);

export default router;