import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import adminRoute from "./routes/adminRoute.js"
import branchRoute from "./routes/branchRoute.js";
import courseRoute from "./routes/courseRoute.js";
import studentRoute from "./routes/studentRoute.js";
import eventRoute from "./routes/eventRoute.js";
import contactRoute from "./routes/contactQueryRoute.js";
import courseSelectionRoute from "./routes/courseSelectionRoute.js";
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import cors from "cors";
dotenv.config({})
const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
  });
  

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
app.use(cookieParser());
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOption));

//routes
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/branch", branchRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/student", studentRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/selection", courseSelectionRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`server listen at port ${PORT}`)
})