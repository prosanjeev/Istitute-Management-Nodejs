import express from "express";
import { createCourse, deleteCourse, getCourse, getCourseById, updateCourse } from "../controllers/courseController.js";

const router = express.Router();

router.route("/create").post(createCourse);
router.route("/").get(getCourse);
router.route("/:id").get(getCourseById).put(updateCourse).delete(deleteCourse);

export default router;