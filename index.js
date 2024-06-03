import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from 'path';
import JobsController from "./controllers/jobs.controller.js";
import applicantValidation from "./middlewares/applicantValidation.middleware.js";
import uploadFile from "./middlewares/upload.middleware.js";
import UserController from "./controllers/user.controller.js";
import session from 'express-session';
import userValidation from "./middlewares/userValidation.js";
const app = express();



const jobsController = new JobsController()
const userController = new UserController()
// session management
app.use(session({ 		
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
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
// login and register
app.get('/register', userController.getRegister);
app.get('/login',userController.getLogin);
app.post('/register', userController.postRegister);
app.post('/login', userController.postLogin)
// apply job
app.post('/jobs/:id', uploadFile.single('applicantResume'), applicantValidation, jobsController.applyForJob);
export default app;
