import Job from "../models/job.model.js";
import Recruiter from "../models/recruiter.model.js";


export const getRecruiters = (req, res, next) => {
  if(req.method === "GET") {
       
    const recruiter = Recruiter.getRecruiterById(req.session.RecruiterId);
    var jobsPosted = [];
    var filteredJobs = [];
    var error = null;
    if(recruiter.jobs.length > 0) {
      recruiter.jobs.forEach(job =>{
        jobsPosted.push(Job.getJobById(job));
      }
    )
    const searchTerm = req.query.search || ''; // Get search term from query string
    filteredJobs = jobsPosted.filter(job => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
         job.jobCategory.toLowerCase().includes(lowerCaseSearchTerm) ||
         job.jobDesignation.toLowerCase().includes(lowerCaseSearchTerm) ||
        job.jobLocation.toLowerCase().includes(lowerCaseSearchTerm) ||
        job.companyName.toLowerCase().includes(lowerCaseSearchTerm) || 
        job.skillsRequired.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
    
            } else {
              error = "You've not posted any jobs";
            }
  return  res.render("jobsPosted", {  name:recruiter.name, error:error, jobs: filteredJobs });
    // res.status(200).render();
  }
}