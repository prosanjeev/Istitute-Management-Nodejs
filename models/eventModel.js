import mongoose from "mongoose";

const eventModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    // password:{
    //     type:String,
    //     required:true
    // }
   
   
}, {timestamps:true});

export const Event = mongoose.model("Event", eventModel)