import express from "express";

import { getJobs, getJobById, getApplicants} from "../controllers/job.controller.js";

import {  apply } from "../controllers/applicant.controller.js";
import {resumeUpload} from "../middlewares/fileUploadMiddleware.js";
import { formValidation } from "../middlewares/expressValidator.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const router = express.Router();

// Display job routes
router.route("/").get(getJobs);
router.route("/:id").get(getJobById);
// router.route("/:id/applicants").get(jwtAuth, getApplicants);

// Job Application router
router.route("/apply/:id").get(apply);
router.route("/apply").post( resumeUpload.single("resume"), formValidation, apply);

export default router;