import JobsModel from "../models/jobs.model.js";
import nodemailer from "nodemailer";
import applicantValidation from "../middlewares/applicantValidation.middleware.js";
// am i missing something in this file
console.log(JobsModel);
export default class JobsController {
  constructor() {
    this.jobsModel = new JobsModel();
    this.getLanding = this.getLanding.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.getJobDetails = this.getJobDetails.bind(this);
    this.applyForJob = this.applyForJob.bind(this);
  }
  getLanding(req, res) {
    return res.render("landing");
  }

  getJobs(req, res) {
    const allJobs = this.jobsModel.getAllJobs();
    return res.render("jobs", { jobs: allJobs });
  }
  getJobDetails(req, res) {
    const id = req.params.id;
    console.log(id);
    const errors = [];
    const job = this.jobsModel.getJobById(id);
    if (job) {
      return res.render("jobDetails", { job, errors });
    } else {
      return res.status(404).send("Job not found");
    }
  }

  applyForJob(req, res) {
    const jobId = req.params.id;
    const job = this.jobsModel.getJobById(jobId);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    req.job = job;

    applicantValidation(req, res, () => {
      upload.single("applicantResume")(req, res, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error uploading file");
        }

        const { applicantName, applicantEmail } = req.body;
        const applicantResume = req.file;
        console.log(applicantName, applicantEmail, applicantResume);
        const transporter = nodemailer.createTransport({
          // Configuring nodemailer

          service: "Gmail",
          auth: {
            user: "sushildev.work@gmail.com",
            pass: "trlo nabi sixh aqnc",
          },
        });

        const mailOptions = {
          from: "sushildev.work@gmail.com",
          to: applicantEmail,
          subject: "Application Submitted Successfully",
          text: `Dear ${applicantName},\n\nYour application for the position at ${job.job_title} has been submitted successfully.\n\nThank you for applying!\n\nBest regards,\nThe Job Portal Team`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });

        req.session.successMessage = "Application submitted successfully!";
        return res.redirect("/jobs");
      });
    });
  }
}
