import express from "express";
import { createContactQuery, deleteContactQuery, getContactQuery, getContactQueryById } from "../controllers/contactQueryController.js";

const router = express.Router();

router.route("/create").post(createContactQuery);
router.route("/").get(getContactQuery);
router.route("/:id").get(getContactQueryById).delete(deleteContactQuery);

export default router;