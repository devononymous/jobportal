import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from 'path';
import JobsController from "./controllers/jobs.controller.js";
import applicantValidation from "./middlewares/applicantValidation.middleware.js";
import uploadFile from "./middlewares/upload.middleware.js";
import UserController from "./controllers/user.controller.js";
import session from 'express-session';
import { auth } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./middlewares/lastVisit.middleware.js";
import userValidation from "./middlewares/userValidation.js";
const app = express();



const jobsController = new JobsController()
const userController = new UserController()
// session management
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

//cookie parser
app.use(cookieParser())
app.use(setLastVisit);

// using express js layouts
app.use(ejsLayouts);
// parse form data
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
app.get('/', jobsController.getLanding );
app.get('/jobs',auth, jobsController.getJobs);
app.get('/jobs/:id', auth, jobsController.getJobDetails)
// login and register
app.get('/register', userController.getRegister);
app.get('/login',userController.getLogin);
app.post('/register',  userController.postRegister);
app.post('/login', userController.postLogin)
app.get('/login', userController.logout)
// apply job
app.post('/jobs/:id', uploadFile.single('applicantResume'), applicantValidation, jobsController.applyForJob);
//logOut
export default app;
