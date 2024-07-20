import { login, register, logout } from "../controllers/login.controller.js";
import express from "express";
import { jwtAuth, setLastVisit } from "../middlewares/jwtAuth.js";


const router = express.Router();
// router.route("/recruiter").get(recruiter);
router.route("/login").get(login);
router.route("/login").post(login);

router.route("/register").get(register);
router.route("/register").post(register);

router.route("/logout").get(jwtAuth, logout);

export default router;
