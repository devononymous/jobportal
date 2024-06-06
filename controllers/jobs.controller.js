import JobsModel from "../models/jobs.model.js";
import nodemailer from "nodemailer";

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
    // return res.render("landing");
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
    const job = this.jobsModel.applyForJob(jobId);
    console.log('job>>>', job)
    if (!job) {
      return res.status(404).send("Job not found");
    }
    const { applicantName, applicantEmail } = req.body;
    const transporter = nodemailer.createTransport({
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
      text: `Dear ${applicantName},\n\n \n Your application for the position at ${job.job_title} has been submitted successfully.\n\nThank you for applying!\n\nBest regards,\nThe Job Portal Team`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    return res.status(201).render("jobs", {successMessage:"Applied successfully"});

  }
}
