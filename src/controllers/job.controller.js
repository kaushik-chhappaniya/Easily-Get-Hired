// import popupS from "popups";
import Job from "../models/job.model.js";
import Recruiter from "../models/recruiter.model.js";
import Applicant from "../models/applicant.model.js";
const jobs = Job.getJobs();
export const getJobs = (req, res, next) => {
   if (req.method === "GET") {
      try {
         const searchTerm = req.query.search || ""; // Get search term from query string
         const filteredJobs = jobs.filter((job) => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return (
               job.jobCategory.toLowerCase().includes(lowerCaseSearchTerm) ||
               job.jobDesignation.toLowerCase().includes(lowerCaseSearchTerm) ||
               job.jobLocation.toLowerCase().includes(lowerCaseSearchTerm) ||
               job.companyName.toLowerCase().includes(lowerCaseSearchTerm) ||
               job.skillsRequired.toLowerCase().includes(lowerCaseSearchTerm)
            );
         });
         // const filteredJobs = jobs.filter(job => job.jobLocation.toLowerCase().includes(searchTerm.toLowerCase()));
         return res.status(200).render("jobs", { jobs: filteredJobs });
      } catch (error) {
         return res.status(401).send("Error: Job Not Found");
      }
   }
};
export const postJob = (req, res, next) => {
   if (req.method === "GET") {
      const recruiter = Recruiter.getRecruiterById(req.session.RecruiterId);
      if (recruiter === undefined) {
         return res.render("error", {
            error: `Recruiter Not Found
            Login again`,
         });
      } else {
         return res.render("postJob", {
            name: recruiter.name,
            recruiterId: req.session.RecruiterId,
         });
      }
   }

   if (req.method === "POST") {
      try {
         const jobDetails = req.body;
         const recId = req.session.RecruiterId;
         const { success, message } = Job.addJob(jobDetails);
         const recruiter = Recruiter.getRecruiterById(recId);
         recruiter.jobs.push(message);
         if (success == true) {
            var jobsPosted = [];
            recruiter.jobs.forEach((job) => {
               jobsPosted.push(Job.getJobById(job));
            });
            return res.redirect("/recruiter/");
         } else {
            return res.status(401).render("error", { error: "Could not add job" });
         }
      } catch (error) {
         return res.status(500).render("error", { error: error });
      }
   }
};

export const getJobById = (req, res, next) => {
   const id = req.params.id;
   const jobFound = Job.getJobById(id);
   if (jobFound) {
      return jobFound;
      //   res.status(200).send("Job Found");
   } else {
      return false;
      //   res.status(401).send("Job not found");
   }
};

export const getApplicants = (req, res, next) => {
   const jobid = req.params.id;
   const applicant = Job.getApplicantsById(jobid);
   if (applicant) {
      const searchTerm = req.query.search || ""; // Get search term from query string
      applicant.filter((a) => {
         const lowerCaseSearchTerm = searchTerm.toLowerCase();
         return (
            a.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            a.email.toLowerCase().includes(lowerCaseSearchTerm) ||
            a.contact.toLowerCase().includes(lowerCaseSearchTerm)
         );
      });
      return res.render("displayApplicants", { applicants: applicant });
   } else {
      return res.status(404).render("error", { error: "No Applicant available" });
   }
};

export const deleteJob = (req, res, next) => {
   try {
      const { jobId } = req.params.id;
      const recruiter = Recruiter.getRecruiterById(req.session.RecruiterId);
      recruiter.jobs.splice(jobId, 1);
      return res.redirect("/recruiter/");
   } catch (error) {
      return res.status(404).render("error", { error: error });
   }
};

export const updateJob = async (req, res, next) => {
   if (req.method === "GET") {
      return res.render("updateJob", { job: jobs[req.params.id - 1] });
   }

   if (req.method === "POST") {
      try {
         //  const job = Job.getJobById(req.params.id);
         const jobDetails = req.body;
         const recId = req.session.RecruiterId;
         const { success, message } = Job.updateJob(req.params.id, jobDetails);
         const recruiter = Recruiter.getRecruiterById(recId);
         if (success == true) {
            return res.redirect("/recruiter/");
         } else {
            return res.render("error", { error: "Could not update job" });
         }
      } catch (error) {
         return res.status(500).render("error", { error: error });
      }
   }
};

export const viewPdf = (req, res, next) => {
   const applicantId = req.params.applicantId;
   const applicant = Applicant.getApplicantById(applicantId);

   if (applicant && applicant.resumePath) {
      // const filePath = path.resolve("public", "uploads", applicant.resumePath);
      //   const filePath = path.join(__dirname, applicant.resumePath); // Construct the full path
      res.download(applicant.resumePath); // Trigger download of the PDF file
   } else {
      res.status(404).send("Applicant not found or PDF path missing.");
   }
};
