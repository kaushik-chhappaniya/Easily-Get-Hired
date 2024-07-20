// Deprecated
import express from "express";
import {  apply } from "../controllers/applicant.controller.js";
import {resumeUpload} from "../middlewares/fileUploadMiddleware.js";
import { formValidation } from "../middlewares/expressValidator.js";

const router = express.Router();

router.route("/apply/:id").get(apply);
router.route("/apply").post( resumeUpload.single("resume"), formValidation, apply);
export default router;