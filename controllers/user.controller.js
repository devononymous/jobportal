import UserModel from "../models/user.model.js";
import JobsModel from "../models/jobs.model.js";

export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    const errorMessages = req.session.validationErrors || []
    req.session.validationErrors = null;

    res.render("login",{ errorMessages });
  }

  postRegister(req, res) {
    const { name, email, password, role } = req.body;
    console.log("registration req", req.body);
    UserModel.add(name, email, password, role);
    res.status(201).render("login", { errorMessages: [] });
  }
  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    console.log("user>> line 25", user)
    if (!user) {
      return res.status(501).render("login", {
        errorMessages: [{ msg: "Invalid Credentials" }],
      });
    }
    req.session.userEmail = email;
    // console.log( "req.session.userEmail:>>>",req.session.userEmail);
    const jobsModel = new JobsModel();
    const allJobs = jobsModel.getAllJobs();
    return res.status(201).render("jobs",{successMessage : "Login successful!",jobs: allJobs });
  }

  logout(req,res){
    // on logout destroy the session
    req.session.destroy((err)=>{
      if(err){
        console.log(err);
      }else {
        res.redirect('/login');
      }
    });
    res.clearCookie('lastVisit');
  }
}
