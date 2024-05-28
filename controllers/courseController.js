import { Course } from "../models/courseModel.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";


export const createCourse = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new ErrorHandler("coursePhoto File Required!", 400));
        }
        const { coursePhoto } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(coursePhoto.mimetype)) {
            return next(
                new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
            );
        }

        const { courseCode, courseName, shortName, categoryName, duration, fee, syllabus } = req.body;
        if (!courseCode || !courseName || !shortName || !categoryName || !duration || !fee || !syllabus) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!["1 Year", "6 Months", "3 Months"].includes(duration)) {
            return res.status(400).send(`Designation must be "1 Year", "6 Months", "3 Months"`);
        }
        const shortname = await Course.findOne({ shortName });
        if (shortname) {
            return res.status(400).json({ message: "shortName already exit try diffrent" });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            coursePhoto.tempFilePath
        );

        // Handle Cloudinary upload errors
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return next(new ErrorHandler("Failed to upload Course Photo to Cloudinary", 500));
        }

        // Create a new course with the uploaded image URL
        await Course.create({
            courseCode,
            courseName,
            shortName,
            categoryName,
            duration,
            fee,
            syllabus,
            coursePhoto: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });

        return res.status(201).json({
            message: "Course created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Internal Server Error", 500));
    }
};

// Read all courses
export const getCourse = async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Read a single course by ID
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json(course);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateCourse = async (req, res) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new ErrorHandler("coursePhoto File Required!", 400));
        }
        const { coursePhoto } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(coursePhoto.mimetype)) {
            return next(
                new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
            );
        }

        const { courseCode, courseName, shortName, categoryName, duration, fee, syllabus } = req.body;
        const courseId = req.params.id;

        if (!courseId || !courseCode || !courseName || !shortName || !categoryName || !duration || !fee || !syllabus) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!["1 Year", "6 Months", "3 Months"].includes(duration)) {
            return res.status(400).send(`Designation must be "1 Year", "6 Months", "3 Months"`);
        }

        // Check if shortName already exists for another course
        const existingShortName = await Course.findOne({ shortName, _id: { $ne: courseId } });
        if (existingShortName) {
            return res.status(400).json({ message: "shortName already exists, please try a different one" });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            coursePhoto.tempFilePath
        );

        // Handle Cloudinary upload errors
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return next(new ErrorHandler("Failed to upload Course Photo to Cloudinary", 500));
        }

        // Update the course
        await Course.findByIdAndUpdate(courseId, {
            courseCode, courseName, shortName, categoryName, duration, fee, syllabus,
            coursePhoto: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });

        return res.status(200).json({
            message: "Course updated successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// Delete an employee
export const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({
            message: "Course deleted successfully",
            success: true,
            course: deletedCourse
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};