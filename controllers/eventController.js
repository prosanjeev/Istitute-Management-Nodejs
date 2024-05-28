import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Event } from "../models/eventModel.js";

export const createEvent = async (req, res) => {
    try {
        const { title, description } = req.body;
        if ( !title || !description  ) {
            return res.status(400).json({ message: "All fields are required" });
        }
       
       
        await Event.create({
            title, description
        });
        return res.status(201).json({
            message: "Event created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

// Read all Events
export const getEvents = async (req, res) => {
    try {
        const event = await Event.find();
        return res.status(200).json(event);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Read a single course by ID
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json(event);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { title, description } = req.body;
        const eventId = req.params.id;

        if (!eventId || !title || !description ) {
            return res.status(400).json({ message: "All fields are required" });
        }
                  
        // Update the event
        await Event.findByIdAndUpdate(eventId, {
            title, description
        });
        
        return res.status(200).json({
            message: "Event updated successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an employee
export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json({
            message: "Event deleted successfully",
            success: true,
            event: deletedEvent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};