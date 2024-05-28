import mongoose from "mongoose";

const branchModel = new mongoose.Schema({
    directorName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
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
    addressProof: {
        type: String,
        enum: ["aadharCard", "voterCard", "passportCard"],
        required: true,
    },
    documentIdNumber: {
        type: String,
        required: true
    },
    centerName: {
        type: String,
        required: true
    },
    officePhone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: "Please enter a valid phone number",
        },
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
    centerPlace: {
        type: String,
        required: true
    },
    whatsappPhone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: "Please enter a valid whatsapp number",
        },
    },
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

export const Branch = mongoose.model("Branch", branchModel)