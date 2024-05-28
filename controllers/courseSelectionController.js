import { SelectedCourse } from "../models/courseSelectionModel.js";

export const createCourseSelection = async (req, res) => {
    try {
        const {courseId, studentId } = req.body;
        if (!courseId|| !studentId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        await SelectedCourse.create({
            courseId, studentId
        });
        return res.status(201).json({
            message: "Course selected successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

// Read all Admissions
export const getAllAdmissions = async (req, res) => {
    try {
        const selectedCourses = await SelectedCourse.find();
        return res.status(200).json(selectedCourses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};