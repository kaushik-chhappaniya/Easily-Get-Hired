import Applicant from "../models/applicant.model.js";
import Job from "../models/job.model.js";
export const apply = (req, res, next) => {
   if (req.method === "GET") {
    //   console.log(req.params.id);
      const id = req.params.id;
      const jobFound = Job.getJobById(id);
      return res.render("apply", { id: id });
   }

   if (req.method === "POST") {
      try {
         const { id, name, email, contact } = req.body;
         const { filename } = req.file;

         const { success, message } = Applicant.apply(id, name, email, contact, filename);
         if (success) {
            Applicant.sendMail(name, email);

        return    res.redirect("/jobs");
         } else {
            return res.status(500).render("error", { error: "could not send email" });
         }
      } catch (error) {
         return res.status(400).render("error", { error: error });
      }
   }
};
