import Applicant from "./applicant.model.js";
export default class Job {
   constructor(
      _id,
      _jobDetails,
      // _id,
      // _jobCategory,
      // _jobDesignation,
      // _jobLocation,
      // _companyName,
      // _salary,
      // _applyBy,
      // _skillsRequired,
      // _numberOfOpenings,
      // _jobPosted,
      // _applicants,
   ) {
      this.id = _id;
      this.jobCategory = _jobDetails.jobCategory;
      this.jobDesignation = _jobDetails.jobDesignation;
      this.jobLocation = _jobDetails.jobLocation;
      this.companyName = _jobDetails.companyName;
      this.salary = _jobDetails.salary;
      this.applyBy = _jobDetails.applyBy;
      this.skillsRequired = _jobDetails.skillsRequired;
      this.numberOfOpenings = _jobDetails.numberOfOpenings;
      this.jobPosted = _jobDetails.jobPosted || new Date().toISOString().slice(0,10);;
      if(_jobDetails.applicants != undefined) {
        this.applicants = _jobDetails.applicants;
      } else{
        this.applicants = [];
      }
      
   }

   static getJobs() {
      return jobs;
   }

   static getJobById(id) {
      return jobs.find((j) => j.id == id);
   }

   static getApplicantsById(id) {
   
   const jobSelected = this.getJobById(id);
    // const jobSelected = jobs[id];
    // jobs.find(j => j.id === id);
    if(jobSelected == undefined) {
      return null;
    }

    if(jobSelected.applicants.length === 0 ){
      return null;
    } else{
      const applicants = [];
      jobSelected.applicants.forEach(element => {
        applicants.push(Applicant.getApplicantById(element));
      });
      return applicants;
      }
   }

   static getApplicants () {
    return jobs.filter((i) => i.applicants.length > 0)
   }

   static addJob(jobDetails) {
    try {
        const newJob = new Job(jobs.length + 1, jobDetails);
        jobs.push(newJob);
        return {success: true, message: newJob.id};
    } catch (error) {
        return { success: false, message: error};
    }
   }
   static updateJob(id, jobDetails) {
      // const findJobIndex = jobs.findIndex((k) => k.id === id);
      try {
        const jobdIndex = jobs.findIndex((j) => j.id == id);
        jobs[jobdIndex] = {...jobs[jobdIndex], ...jobDetails};
         return { success: true, message: "Jobs Updated" };
      } catch (err) {
         return { success: false, message: err };
      }
   }

   static deleteJob(id) {
      const findJobIndex = jobs.findIndex((k) => k.id === id);
      try {
         if (findJobIndex > -1) {
            jobs.splice(findJobIndex, 1);
         }
         return { success: true, message: "Job deleted successfully" };
      } catch (err) {
         return { success: false, message: err + " Item not Found" };
      }
   }
}

var jobs = [
   new Job(1, {
      jobCategory: "IT",
      jobDesignation: "Intern",
      jobLocation: "Pune",
      companyName: "PSL",
      salary: "8LPA",
      applyBy: "12/06",
      skillsRequired: "MERN",
      numberOfOpenings: "10",
      jobPosted: "01/06",
      applicants: [],
   }),
   // Sample Job 1 (Software Engineer)
new Job(2, {
   jobCategory: "IT",
   jobDesignation: "Software Engineer",
   jobLocation: "Bangalore",
   companyName: "Google",
   salary: "15LPA",
   applyBy: "30/06",
   skillsRequired: "Python, Java",
   numberOfOpenings: "5",
   jobPosted: "15/06",
   applicants: [1, 2],
 }),
 
 // Sample Job 2 (Content Marketing Specialist)
 new Job(3, {
   jobCategory: "Marketing",
   jobDesignation: "Content Marketing Specialist",
   jobLocation: "Mumbai",
   companyName: "Amazon",
   salary: "10LPA",
   applyBy: "20/06",
   skillsRequired: "SEO, Content Writing, Social Media Marketing",
   numberOfOpenings: "2",
   jobPosted: "10/06",
   applicants: [3,4,5],
 }),
 
 // Sample Job 3 (Graphic Designer)
 new Job(4, {
   jobCategory: "Design",
   jobDesignation: "Graphic Designer",
   jobLocation: "Hyderabad",
   companyName: "Adobe",
   salary: "7LPA",
   applyBy: "15/07",
   skillsRequired: "Photoshop, Illustrator, InDesign",
   numberOfOpenings: "3",
   jobPosted: "01/07",
   applicants: [],
 }),
 
 // Sample Job 4 (Data Analyst)
 new Job(5, {
   jobCategory: "Data Science",
   jobDesignation: "Data Analyst",
   jobLocation: "Gurgaon",
   companyName: "IBM",
   salary: "12LPA",
   applyBy: "25/07",
   skillsRequired: "SQL, Python (pandas, NumPy), Data Visualization",
   numberOfOpenings: "1",
   jobPosted: "10/07",
   applicants: [],
 }),
   new Job(6, {
     jobCategory: "IT",
     jobDesignation: "Software Engineer",
     jobLocation: "Bangalore",
     companyName: "TCS",
     salary: "10LPA",
     applyBy: "15/06",
     skillsRequired: "Java, Python",
     numberOfOpenings: "5",
     jobPosted: "05/06",
     applicants: [],
   }),
   new Job(7, {
     jobCategory: "Marketing",
     jobDesignation: "Content Writer",
     jobLocation: "Mumbai",
     companyName: "Mindtree",
     salary: "5LPA",
     applyBy: "20/06",
     skillsRequired: "SEO, Content Marketing",
     numberOfOpenings: "2",
     jobPosted: "08/06",
     applicants: [],
   }),
   new Job(8, {
     jobCategory: "Finance",
     jobDesignation: "Financial Analyst",
     jobLocation: "Delhi",
     companyName: "Deloitte",
     salary: "8LPA",
     applyBy: "10/06",
     skillsRequired: "Financial Modeling, Excel",
     numberOfOpenings: "1",
     jobPosted: "02/06",
     applicants: [],
   }),
   new Job(9, {
     jobCategory: "Design",
     jobDesignation: "Graphic Designer",
     jobLocation: "Hyderabad",
     companyName: "InMobi",
     salary: "7LPA",
     applyBy: "25/06",
     skillsRequired: "Adobe Photoshop, Illustrator",
     numberOfOpenings: "3",
     jobPosted: "12/06",
     applicants: [],
   }),
   new Job(10, {
     jobCategory: "Sales",
     jobDesignation: "Business Development Representative",
     jobLocation: "Chennai",
     companyName: "Zoho",
     salary: "6LPA",
     applyBy: "30/06",
     skillsRequired: "Communication, Sales",
     numberOfOpenings: "4",
     jobPosted: "18/06",
     applicants: [],
   }),
   new Job(11, {
      jobCategory: "Marketing",
      jobDesignation: "Digital Marketing Specialist",
      jobLocation: "Mumbai",
      companyName: "Start-up Inc.",
      salary: "7 LPA",
      applyBy: "20/06",
      skillsRequired: "SEO, SEM, Social Media Marketing",
      numberOfOpenings: "2",
      jobPosted: "10/06",
      applicants: [],
    }),
    new Job(12, {
      jobCategory: "Sales",
      jobDesignation: "Business Development Manager",
      jobLocation: "Delhi",
      companyName: "XYZ Corporation",
      salary: "Negotiable",
      applyBy: "30/06",
      skillsRequired: "Sales Negotiation, Lead Generation, Business Development",
      numberOfOpenings: "3",
      jobPosted: "15/06",
      applicants: [],
    }),
    new Job(13, {
      jobCategory: "Finance",
      jobDesignation: "Accountant",
      jobLocation: "Chennai",
      companyName: "ABC Financial Services",
      salary: "5 LPA",
      applyBy: "25/06",
      skillsRequired: "Accounting Software (Tally, QuickBooks), Financial Reporting",
      numberOfOpenings: "1",
      jobPosted: "20/06",
      applicants: [],
    }),
    new Job(14, {
      jobCategory: "HR",
      jobDesignation: "Human Resources Specialist",
      jobLocation: "Hyderabad",
      companyName: "MNO Pvt. Ltd.",
      salary: "6 LPA",
      applyBy: "18/06",
      skillsRequired: "Recruitment, Employee Relations, Payroll Processing",
      numberOfOpenings: "4",
      jobPosted: "08/06",
      applicants: [],
    }),
    new Job(15, {
      jobCategory: "Design",
      jobDesignation: "Graphic Designer",
      jobLocation: "Remote",
      companyName: "Creative Agency",
      salary: "Competitive",
      applyBy: "22/06",
      skillsRequired: "Adobe Photoshop, Illustrator, UI/UX Design",
      numberOfOpenings: "1",
      jobPosted: "12/06",
      applicants: [],
    }),
    new Job(16, {
      jobCategory: "Content",
      jobDesignation: "Content Writer",
      jobLocation: "Bangalore",
      companyName: "Tech Blog",
      salary: "4 LPA",
      applyBy: "17/06",
      skillsRequired: "Writing, Editing, SEO Content Creation",
      numberOfOpenings: "2",
      jobPosted: "07/06",
      applicants: [],
    }),
    
    new Job(17, {
      jobCategory: "Customer Service",
      jobDesignation: "Customer Support Specialist",
      jobLocation: "Pune",
      companyName: "E-commerce Company",
      salary: "3.5 LPA",
      applyBy: "28/06",
      skillsRequired: "Communication Skills, Problem Solving, Customer Support Tools",
      numberOfOpenings: "5",
      jobPosted: "18/06",
      applicants: [],
    }),
    
    new Job(18, {
      jobCategory: "Operations",
      jobDesignation: "Supply Chain Specialist",
      jobLocation: "Mumbai",
      companyName: "Logistics Company",
      salary: "6.5 LPA",
      applyBy: "24/06",
      skillsRequired: "Inventory Management, Logistics Operations, Supply Chain Management",
      numberOfOpenings: "3",
      jobPosted: "14/06",
      applicants: [],
    }),
    new Job(19, {
      jobCategory: "Healthcare",
      jobDesignation: "Registered Nurse",
      jobLocation: "Chennai",
      companyName: "General Hospital",
      salary: "Negotiable",
      applyBy: "30/06",
      skillsRequired: "Nursing License, Medical Experience, Patient Care",
      numberOfOpenings: "2",
      jobPosted: "21/06",
      applicants: [],
    }),
    new Job(20, {
      jobCategory: "Marketing",
      jobDesignation: "Digital Marketing Specialist",
      jobLocation: "Mumbai",
      companyName: "Unilever",
      salary: "7LPA",
      applyBy: "25/06",
      skillsRequired: "SEO, SEM, Social Media Marketing",
      numberOfOpenings: "2",
      jobPosted: "15/06",
      applicants: [],
    }),
    new Job(21, {
      jobCategory: "Finance",
      jobDesignation: "Investment Banker",
      jobLocation: "Delhi",
      companyName: "Goldman Sachs",
      salary: "15LPA+",
      applyBy: "30/06",
      skillsRequired: "Financial Modeling, M&A, Valuation",
      numberOfOpenings: "1",
      jobPosted: "20/06",
      applicants: [],
    }),
    new Job(22, {
      jobCategory: "Healthcare",
      jobDesignation: "Registered Nurse",
      jobLocation: "Chennai",
      companyName: "Apollo Hospitals",
      salary: "6LPA",
      applyBy: "05/07",
      skillsRequired: "Nursing License, CPR Certification",
      numberOfOpenings: "10",
      jobPosted: "25/06",
      applicants: [],
    }),
    new Job(23, {
      jobCategory: "Sales",
      jobDesignation: "Business Development Representative",
      jobLocation: "Pune",
      companyName: "Marriott International",
      salary: "5LPA + Commission",
      applyBy: "10/07",
      skillsRequired: "Sales Negotiation, Client Relationship Management",
      numberOfOpenings: "4",
      jobPosted: "30/06",
      applicants: [],
    }),
    new Job(24, {
      jobCategory: "Customer Service",
      jobDesignation: "Customer Support Specialist",
      jobLocation: "Remote",
      companyName: "Amazon",
      salary: "4.5LPA",
      applyBy: "15/07",
      skillsRequired: "Excellent Communication Skills, Problem-solving",
      numberOfOpenings: "8",
      jobPosted: "05/07",
      applicants: [],
    }),
    new Job(25, {
      jobCategory: "Engineering",
      jobDesignation: "Mechanical Engineer",
      jobLocation: "Bangalore",
      companyName: "Bosch",
      salary: "9LPA",
      applyBy: "20/07",
      skillsRequired: "CAD/CAM, Machine Design",
      numberOfOpenings: "2",
      jobPosted: "10/07",
      applicants: [],
    }),
    new Job(26, {
      jobCategory: "Content",
      jobDesignation: "Content Writer",
      jobLocation: "Gurgaon",
      companyName: "Hindustan Times",
      salary: "4LPA",
      applyBy: "25/07",
      skillsRequired: "SEO Writing, Content Marketing",
      numberOfOpenings: "1",
      jobPosted: "15/07",
      applicants: [],
    }),
    new Job(27, {
      jobCategory: "Human Resources",
      jobDesignation: "Human Resources Specialist",
      jobLocation: "Hyderabad",
      companyName: "Flipkart",
      salary: "6.5LPA",
      applyBy: "30/07",
      skillsRequired: "Recruitment, Employee Relations",
      numberOfOpenings: "3",
      jobPosted: "20/07",
      applicants: [],
    }),
    new Job(28, {
      jobCategory: "IT",
      jobDesignation: "Software Engineer",
      jobLocation: "Hyderabad",
      companyName: "Wipro",
      salary: "8LPA",
      applyBy: "20/06",
      skillsRequired: "JavaScript, React",
      numberOfOpenings: "3",
      jobPosted: "10/06",
      applicants: [],
    }),

];
// _id,
// jobCategory,
// jobDesignation,
// jobLocation,
// companyName,
// salary,
// applyBy,
// skillsRequired,
// numberOfOpenings,
// jobPosted,
// applicants,
