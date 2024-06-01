import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from 'path';
import JobsController from "./controllers/jobs.controller.js";
import applicantValidation from "./middlewares/applicantValidation.middleware.js";
const app = express();



const jobsController = new JobsController()
// parse form data
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
app.use(ejsLayouts);
app.get('/', jobsController.getLanding );
app.get('/jobs', jobsController.getJobs);
app.get('/jobs/:id',jobsController.getJobDetails)
app.post('/jobs/:id', jobsController.applyForJob); 

export default app;
