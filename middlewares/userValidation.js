
import { body, validationResult } from "express-validator"


const userValidation = async(req,res,next)=>{
const rules = [
 body('email').isEmail().withMessage("email is required")
 .isEmpty().withMessage("Email is required"),
 body('password').isEmpty().withMessage("password is required")
];
// 2. run those rules.
 await Promise.all(rules.map(rule=>rule.run(req)))
 //3. check if there are errors after running the rules.
const  validationErrors = validationResult(req);
//4. If errors, return the error message
if(!validationErrors.isEmpty()){
    req.session.validationErrors = validationErrors.array();
    return res.redirect('/login');
}
// clearing the session errors if validation passes
req.session.validationErrors =  null;
next();

}

export default userValidation


