import mongoose from "mongoose";

const courseModel = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        enum: ["1 Year", "6 Months", "3 Months"],
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },

    syllabus: {
        type: [String],
        required: true,
        // Changed to array of strings
    },
    coursePhoto: {
        public_id: {
            type: String, 
            required: true,
          },
          url: {
            type: String, 
            required: true,
          },
    },
}, { timestamps: true });

export const Course = mongoose.model("Course", courseModel)