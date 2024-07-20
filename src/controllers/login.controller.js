import bcrypt from "bcrypt"; // For password hashing
import Recruiter from "../models/recruiter.model.js";
import jwt from "jsonwebtoken";
import Job from "../models/job.model.js";
import path from "path";
let recruiters = Recruiter.getRecruiters();
let jobs = Job.getJobs();
const jwtSecret = 'MYJWTSECRETTOKEN';
// *_*_*_*_*_*_*_*_*_*_*_*_*_* Register *_*_*_*_*_*_*_*_*_*_*_*_*_*
export const register = (req, res, next) => {
  if (req.method === "GET") {
    return res.render("register");
  }

  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;
      Recruiter.addRecruiter(name, email, password);
      return res.render("jobsPosted", {name:name, error:"You've not posted any jobs"});
    } catch (err) {
      return res.status(500).render("error",{error:err});
    }
  }
};

// *_*_*_*_*_*_*_*_*_*_*_*_*_* Login method *_*_*_*_*_*_*_*_*_*_*_*_*_*
export const login = (req, res, next) => {
  // GET Login
  if (req.method === "GET") {
    try {
      req.session.destroy((err) => {
        if(err) {
          console.error(err);
          return res.status(400).render("error",{error:err});
        } else{
        return res.render("login");
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(404).render("error",{error:error});
    }
    return res.render("login");
  }

  // POST Login
  if (req.method === "POST") {
    let {success, message} = confirmLogin(req.body);
    if (success == true) {  
      // const DemouserId = recruiters.findIndex((r) => r.email === req.body.email);
      // console.log('DemouserId :', DemouserId);
      const RecruiterId = message.id;
      const token = jwt.sign(
        {  RecruiterId
         },
        jwtSecret,
        { expiresIn: "30m" }
      );
      req.session.RecruiterId = (message.id);
      const recruiter = Recruiter.getRecruiterById(req.session.RecruiterId);
      var jobsPosted =[];
      var error = null;
      if(recruiter.jobs.length > 0) {
        recruiter.jobs.forEach((job) =>{
          jobsPosted.push(Job.getJobById(job));
        }
      )
            } else {
              error = "You've not posted any jobs";
            }

    return res
      .status(201)
      .cookie("jwtToken", token)
      .cookie("RecruiterId", RecruiterId).redirect("/recruiter");
      // .cookie("RecruiterId", RecruiterId).render("jobsPosted", {name:message.name, error:error, jobs: jobsPosted});
      // .json({ status: "success", msg: "login successfull", token });
  } else {
   return res.status(400).render("error",{error:"invalid user details"});
  }



   

  }
};


// *_*_*_*_*_*_*_*_*_*_*_*_*_* Logout Method *_*_*_*_*_*_*_*_*_*_*_*_*_*
export const logout = (req, res, next) => {
  try {
  req.session.destroy((err) => {
    if(err) {
      console.error(err);
      return res.status(404).render("error",{error:err});
    } else {
      return res.sendFile(path.resolve("src", "public", "main.html"));
    }
  });
} catch (error) {
  console.error(error);
 return res.status(404).render("error",{error:error});
}
}

// To validate the login
export const confirmLogin = (data) => {
  try {
    const { email, password } = data;
    const foundRecruiter = recruiters.find((recruiter) => recruiter.email === email);
    if (!foundRecruiter) {
      return {success:false, message: "Recruiter Not found."};
    }
    // Compare hashed passwords
    const match = bcrypt.compareSync(password, foundRecruiter.password);
      if(match) {
        return {success:true, message: foundRecruiter  }
      }
         else{
        return {success:false, message: "Match failed"};
      }

  } catch (error) {
    // res.status(500).send(error.message);
    return {success:false, message:error};
  }
}