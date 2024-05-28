import express from "express";
import { createCourseSelection, getAllAdmissions } from "../controllers/courseSelectionController.js";

const router = express.Router();

router.route("/create").post(createCourseSelection);
router.route("/").get(getAllAdmissions);

export default router;