import mongoose from "mongoose";

const studentModel = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: "Please enter a valid email address",
        },
    },
    primaryPhone: {
        type:Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: "Please enter a valid phone number",
        },
    },
    aadharNumber: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    policeStation: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    // whatsappPhone: {
    //     type: String,
    //     required: true,
    //     validate: {
    //         validator: function (v) {
    //             return /^\d+$/.test(v);
    //         },
    //         message: "Please enter a valid whatsapp number",
    //     },
    // },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }


}, { timestamps: true });

export const Student = mongoose.model("Student", studentModel)