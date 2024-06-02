import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from 'path';
import JobsController from "./controllers/jobs.controller.js";
import applicantValidation from "./middlewares/applicantValidation.middleware.js";
import uploadFile from "./middlewares/upload.middleware.js";
import UserController from "./controllers/user.controller.js";
import validateRegistration from "./middlewares/userValidation.js";
const app = express();



const jobsController = new JobsController()
const userController = new UserController()
// using express js layouts
app.use(ejsLayouts);
// parse form data
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
app.get('/', jobsController.getLanding );
app.get('/jobs', jobsController.getJobs);
app.get('/jobs/:id',jobsController.getJobDetails)
app.get('/register', userController.getRegister);
app.get('/login',userController.getLogin);
app.post('/jobs/:id', uploadFile.single('applicantResume'), applicantValidation, jobsController.applyForJob);
app.post('/register', userController.postRegister);
export default app;
