import express from "express";
import { createBranch, deleteBranch, getBranchById, getBranches, login, logout, updateBranch  } from "../controllers/branchController.js";

const router = express.Router();

router.route("/create").post(createBranch);
router.route("/").get(getBranches);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id").get(getBranchById).put(updateBranch).delete(deleteBranch);

export default router;