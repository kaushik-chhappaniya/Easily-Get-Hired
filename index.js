import express from 'express';
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import expressEjsLayouts from "express-ejs-layouts";
import cors from "cors";
import loginRoutes from './src/routes/login.routes.js';
import recruiterRoutes from './src/routes/recruiter.routes.js';
import jobRoutes from './src/routes/job.routes.js';
import { jwtAuth, setLastVisit } from './src/middlewares/jwtAuth.js';
import { getJobs } from './src/controllers/job.controller.js';

const app = express();
// export const server = http.createServer(app);
// Set Express JS layouts
app.use(express.static(path.resolve("src","public"),{
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

app.use(expressEjsLayouts);
app.set("view engine","ejs");
app.set("views",path.resolve("src", "views"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(setLastVisit);
app.use(session({
    secret:'MySafeSecret',
    resave:false,
    saveUninitialized:true,
    cookie: {  httpOnly: true }
}))
// To use the secure rue in the session options we need to install the certificate and the key for SSL certificate validation.

// const test = (req, res, next) => {
//     res.end("This is test api endpoint");
// };
// app.get("/test",jwtAuth, test);

// Routes
app.get("/", (req, res) => {
   return res.sendFile(path.resolve("src", "public", "main.html"));
});

app.get("/explore", getJobs);
app.use("/", loginRoutes);  // Login Routes
app.use("/recruiter",  recruiterRoutes); // Recruiter Routes
app.use("/jobs", jobRoutes);
// app.use("/jobs", applicantRoutes);
// app.use(cors({
//     origin: "https://cdn.tailwindcss.com/",
//     origin: "http://localhost:3012",
// }));
app.options('*', cors());
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': 'http://localhost:3012',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

export default app;