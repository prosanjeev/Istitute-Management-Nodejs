import mongoose from "mongoose";

const courseSelectionModel = new mongoose.Schema({
    courseId:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    },
    
   
}, {timestamps:true});

export const SelectedCourse = mongoose.model("SelectedCourse", courseSelectionModel)