import express from "express";
import { createStudent, deleteStudent, getStudentById, getStudents, login, logout, updateStudent  } from "../controllers/studentController.js";

const router = express.Router();

router.route("/create").post(createStudent);
router.route("/").get(getStudents);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id").get(getStudentById).put(updateStudent).delete(deleteStudent);

export default router;