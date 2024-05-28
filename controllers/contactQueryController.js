import { Contact } from "../models/contactQueryModel.js";

export const createContactQuery = async (req, res) => {
    try {
        const {name, phone, email, title, description } = req.body;
        if (!name|| !phone|| !email|| !title|| !description  ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        await Contact.create({
            name, phone, email, title, description
        });
        return res.status(201).json({
            message: "Contact created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

// Read all ContactQuery
export const getContactQuery = async (req, res) => {
    try {
        const contactUs = await Contact.find();
        return res.status(200).json(contactUs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Read a single course by ID
export const getContactQueryById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "ContactQuery not found" });
        }
        return res.status(200).json(contact);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// export const updateContactQuery = async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         const eventId = req.params.id;

//         if (!eventId || !title || !description ) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
                  
//         // Update the event
//         await Event.findByIdAndUpdate(eventId, {
//             title, description
//         });
        
//         return res.status(200).json({
//             message: "Event updated successfully",
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };


// Delete an employee
export const deleteContactQuery = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: "ContactQuery not found" });
        }
        return res.status(200).json({
            message: "ContactQuery deleted successfully",
            success: true,
            contact: deletedContact
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};