import Job from "./job.model.js";
import ejs from "ejs";
import path from "path";
import nodemailer from "nodemailer";
export default class Applicant {
   constructor(_id, _name, _email, _contact, _resumePath) {
      this.id = _id;
      this.name = _name;
      this.email = _email;
      this.resumePath = _resumePath;
      this.contact = _contact;
   }

   static getApplicantById(id) {
      const applicant = applicants.find((applicant) => applicant.id == id);
      return applicant;
      //  applicants[id];
   }

   static addApplicant(name, email, contact, resumePath) {
      try {
         resumePath = path.resolve("public", "uploads") + resumePath;
         const application = new Applicant(applicants.length + 1, name, email, contact, resumePath);
         applicants.push(application);
         return { success: true, message: application.id };
      } catch (e) {
         return { success: false, message: e };
      }
   }

   static apply(jobId, name, email, contact, resumePath) {
      //set apply logic
      try {
         //add applicant name
         const job = Job.getJobById(jobId);
         const { success, message } = this.addApplicant(name, email, contact, resumePath);
         job.applicants.push(message);

         return { success: true, message: message };
      } catch (err) {
         return { success: false, message: err };
      }
   }

   static sendMail(name, email) {
      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: "YOUR_EMAIL",
            pass: "YOUR_API_KEY",
         },
      });

      const template_path = path.resolve("src", "public", "mailTemplate.ejs");
      const image_path = path.resolve("src", "public", "static", "bird.jpeg");

      ejs.renderFile(template_path, { name: name }, function (err, template) {
         if (err) {
            console.log("err :", err);
         } else {
            const mailOptions = {
               from: "YOUR_EMAIL",
               to: email,
               subject: "Job Application Successfully Submitted",
               text: `Dear ${name}, Thank you for applying to a job at Easily. We have received your application and are currently reviewing it.If your qualifications match our requirements, we will contact you for the next steps of the selection process. Thank you for your interest in joining our team! Best regards, The Easily Team`,
               html: template,
               attachments: [
                  {
                     filename: "bird.jpeg",
                     path: image_path,
                     cid: "sameCIDvalue",
                  },
               ],
            };

            transporter.sendMail(mailOptions, (error, info) => {
               if (error) {
                  return { success: false, message: error };
               } else {
                  console.log("Email sent:", info.response);
                  return { success: true, message: "Email sent successfully" };
               }
            });
         }
      });
   }
}

var applicants = [
   new Applicant(1, "Raj ", "kkcanr@gmail.com", "21312523", "public/uploads/DEMO-RESUME.pdf"),
   new Applicant(2, "Abhi ", "dummy3@gmail.com", "56169235", "public/uploads/DEMO-RESUME1.pdf"),
   new Applicant(3, "Kunal ", "dummy@gmail.com", "54544235", "public/uploads/DEMO-RESUME3.pdf"),
   new Applicant(4, "Kunal ", "dummy@gmail.com", "54544235", "public/uploads/DEMO-RESUME4.pdf"),
   new Applicant(5, "Sid ", "dummy@gmail.com", "498465", "public/uploads/DEMO-RESUME2.pdf"),
];
