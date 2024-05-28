import express from "express";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.route("/create").post(createEvent);
router.route("/").get(getEvents);
router.route("/:id").get(getEventById).put(updateEvent).delete(deleteEvent);

export default router;