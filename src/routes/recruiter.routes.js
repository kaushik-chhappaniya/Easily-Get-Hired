import { login } from "../controllers/login.controller.js";
import express from "express";
import { getRecruiters } from "../controllers/recruiter.controller.js";
import { postJob, getJobById, deleteJob, updateJob, getApplicants, viewPdf } from "../controllers/job.controller.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";


const router = express.Router();
router.route("/").get(jwtAuth, getRecruiters);
router.route("/post-job").get(jwtAuth, postJob);
router.route("/post-job").post(jwtAuth, postJob);

router.route("/jobs/:id").get( jwtAuth, getJobById);

router.route("/:id/delete-job").get(jwtAuth, deleteJob);
router.route("/:id/update-job").get(jwtAuth, updateJob);
router.route("/:id/update-job").post(jwtAuth, updateJob);
router.route("/:id/applicants").get(jwtAuth, getApplicants);
router.route("/:applicantId/view-pdf").get(viewPdf);
export default router;
