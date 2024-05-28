import mongoose from "mongoose";

const contactQueryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: "Please enter a valid phone number",
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: "Please enter a valid email address",
        },
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactQueryModel)