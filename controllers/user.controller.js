import UserModel from "../models/user.model.js";
import JobsModel from "../models/jobs.model.js";
export default class UserController{


    getRegister(req,res){
        res.render('register')
    }

    getLogin(req,res){
        res.render('login',{erorrMessage:null})
    }
   postRegister(req,res){
    const {name, email, password, userType} = req.body;
    console.log("registration req", req.body);
    UserModel.add(name, email, password, userType)
    res.status(201).render('landing')

   }
   postLogin(req,res){
    const { email, password} = req.body;
    const user = UserModel.isValidUser(email,password);
    if(!user){
      return  res.render('login',  {
            errorMessage:'Invalid Credentials',
        });
    }
    const jobsModel = new JobsModel();
    const allJobs = this.jobsModel.getAllJobs();
    return res.render("jobs", { jobs: allJobs });

   }
}