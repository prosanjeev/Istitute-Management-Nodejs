// import { response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Student } from "../models/studentModel.js";

// Create an employee
export const createStudent = async (req, res) => {
    try {
        const { studentName, gender, fatherName, motherName, email, primaryPhone, aadharNumber, dateOfBirth, state, district, policeStation, pinCode, village, username, password } = req.body;
        if (!studentName || !gender || !fatherName || !motherName || !email || !primaryPhone || !aadharNumber || !dateOfBirth || !state || !district || !policeStation || !pinCode || !village || !username || !password) {
            return res.status(400).json({ message: "All fields are  required" });
        }

        // Validate email format
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }
        function isValidPhoneNumber(phoneNumber) {
            return /^\d{10}$/.test(phoneNumber);
        }

        if (!isValidPhoneNumber(primaryPhone)) {
            return res.status(400).json({ message: "Please enter a valid 10-digit phone number for primary phone" });
        }

        // Validate phone format for officePhone
        if (!/^\d{6}$/.test(pinCode)) {
            return res.status(400).json({ message: "Please enter a valid 6-digit pinCode" });
        }

        // const emailExists = await Student.exists({ email });
        const usernameExists = await Student.exists({ username });

        if (usernameExists) {
            return res.status(400).json({ message: "Email and username already exist, please try different ones" });
        }

        if (!["male", "female"].includes(gender)) {
            return res.status(400).send("Gender must be 'male' or 'female'");
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await Student.create({
            studentName, gender, fatherName, motherName, email, primaryPhone, aadharNumber, dateOfBirth, state, district, policeStation, pinCode, village,
            username,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "Student created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Read all Studentes
export const getStudents = async (req, res) => {
    try {
        const Students = await Student.find();
        return res.status(200).json(Students);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Read a single employee by ID
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json(student);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update an employee
export const updateStudent = async (req, res) => {
    try {
        const { studentName, gender, fatherName, motherName, email, primaryPhone, aadharNumber, dateOfBirth, state, district, policeStation, pinCode, village, password } = req.body;
        if (!studentName || !gender || !fatherName || !motherName || !email || !primaryPhone || !aadharNumber || !dateOfBirth || !state || !district || !policeStation || !pinCode || !village || !password) {
            return res.status(400).json({ message: "All fields are  required" });
        }

        // Validate email format
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }
        function isValidPhoneNumber(phoneNumber) {
            return /^\d{10}$/.test(phoneNumber);
        }

        if (!isValidPhoneNumber(primaryPhone)) {
            return res.status(400).json({ message: "Please enter a valid 10-digit phone number for primary phone" });
        }



        // Validate phone format for officePhone
        if (!/^\d{6}$/.test(pinCode)) {
            return res.status(400).json({ message: "Please enter a valid 6-digit pinCode" });
        }

        // const emailExists = await Student.exists({ email });
        // const usernameExists = await Student.exists({ username });

        // if (emailExists && usernameExists) {
        //     return res.status(400).json({ message: "Email and username already exist, please try different ones" });
        // } else if (emailExists) {
        //     return res.status(400).json({ message: "Email already exists, please try a different one" });
        // } else if (usernameExists) {
        //     return res.status(400).json({ message: "Username already exists, please try a different one" });
        // }
        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, {
            studentName, gender, fatherName, motherName, email, primaryPhone, aadharNumber, dateOfBirth, state, district, policeStation, pinCode, village,       // username,
            password: hashedPassword,
        }, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({
            message: "Student updated successfully",
            success: true,
            student: updatedStudent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete an employee
export const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({
            message: "Student deleted successfully",
            success: true,
            student: deletedStudent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await Student.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            directorName: user.directorName,
            gender: user.gender,
            primaryPhone: user.primaryPhone,
            email: user.email,
            addressProof: user.addressProof,
            documentIdNumber: user.documentIdNumber,
            centerName: user.centerName,
            officePhone: user.officePhone,
            state: user.state,
            district: user.district,
            policeStation: user.policeStation,
            pinCode: user.pinCode,
            centerPlace: user.centerPlace,
            whatsappPhone: user.whatsappPhone,

        })

    } catch (error) {
        console.log(error)
    }
}

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logout successfully."
        })
    } catch (error) {
        console.log(error)
    }
}