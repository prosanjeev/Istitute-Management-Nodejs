// import { response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Branch } from "../models/branchModel.js";

// Create an employee
export const createBranch = async (req, res) => {
    try {
        const { directorName, gender, email, primaryPhone, addressProof, documentIdNumber, centerName, officePhone, state, district, policeStation, pinCode, centerPlace, whatsappPhone, username, password } = req.body;
        if (!directorName || !gender || !email || !primaryPhone || !addressProof || !documentIdNumber || !centerName || !officePhone || !state || !district || !policeStation || !pinCode || !centerPlace || !whatsappPhone || !username || !password) {
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

        if (!isValidPhoneNumber(officePhone)) {
            return res.status(400).json({ message: "Please enter a valid 10-digit phone number for office phone" });
        }

        if (!isValidPhoneNumber(whatsappPhone)) {
            return res.status(400).json({ message: "Please enter a valid 10-digit phone number for WhatsApp phone" });
        }

        // Validate phone format for officePhone
        if (!/^\d{6}$/.test(pinCode)) {
            return res.status(400).json({ message: "Please enter a valid 6-digit pinCode" });
        }

        const emailExists = await Branch.exists({ email });
        const usernameExists = await Branch.exists({ username });

        if (emailExists && usernameExists) {
            return res.status(400).json({ message: "Email and username already exist, please try different ones" });
        } else if (emailExists) {
            return res.status(400).json({ message: "Email already exists, please try a different one" });
        } else if (usernameExists) {
            return res.status(400).json({ message: "Username already exists, please try a different one" });
        }



        if (!["male", "female"].includes(gender)) {
            return res.status(400).send("Gender must be 'male' or 'female'");
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await Branch.create({
            directorName, gender, primaryPhone, email, addressProof, documentIdNumber, centerName, officePhone, state, district, policeStation, pinCode, centerPlace, whatsappPhone,
            username,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "Branch created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Read all branches
export const getBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        return res.status(200).json(branches);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Read a single employee by ID
export const getBranchById = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Branch not found" });
        }
        return res.status(200).json(branch);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update an employee
export const updateBranch = async (req, res) => {
    try {
        const { directorName, gender, primaryPhone, email, addressProof, documentIdNumber, centerName, officePhone, state, district, policeStation, pinCode, centerPlace, whatsappPhone,  password } = req.body;
        if (!directorName || !gender || !email || !primaryPhone || !addressProof || !documentIdNumber || !centerName || !officePhone || !state || !district || !policeStation || !pinCode || !centerPlace || !whatsappPhone  || !password) {
            return res.status(400).json({ message: "All fields are required" });
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

        if (!isValidPhoneNumber(officePhone)) {
            return res.status(400).json({ message: "Please enter a valid 10-digit phone number for office phone" });
        }

        if (!isValidPhoneNumber(whatsappPhone)) {
            return res.status(400).json({ message: "Please enter a valid 10-digit phone number for WhatsApp phone" });
        }

        // Validate phone format for officePhone
        if (!/^\d{6}$/.test(pinCode)) {
            return res.status(400).json({ message: "Please enter a valid 6-digit pinCode" });
        }

        // const emailExists = await Branch.exists({ email });
        // const usernameExists = await Branch.exists({ username });

        // if (emailExists && usernameExists) {
        //     return res.status(400).json({ message: "Email and username already exist, please try different ones" });
        // } else if (emailExists) {
        //     return res.status(400).json({ message: "Email already exists, please try a different one" });
        // } else if (usernameExists) {
        //     return res.status(400).json({ message: "Username already exists, please try a different one" });
        // }
        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedBranch = await Branch.findByIdAndUpdate(req.params.id, {
            directorName, gender, primaryPhone, email, addressProof, documentIdNumber, centerName, officePhone, state, district, policeStation, pinCode, centerPlace, whatsappPhone,
            // username,
            password: hashedPassword,
        }, { new: true });

        if (!updatedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        return res.status(200).json({
            message: "Branch updated successfully",
            success: true,
            branch: updatedBranch
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete an employee
export const deleteBranch = async (req, res) => {
    try {
        const deletedBranch = await Branch.findByIdAndDelete(req.params.id);
        if (!deletedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        return res.status(200).json({
            message: "Branch deleted successfully",
            success: true,
            branch: deletedBranch
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
        const user = await Branch.findOne({ username });
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