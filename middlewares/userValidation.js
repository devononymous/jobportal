
import { body, validationResult } from "express-validator"


const userValidation = async(req,res,next)=>{
const rules = [
 body('email').isEmpty().withMessage("Name is required"),
 body('password')
 .isEmpty().withMessage("Email is required")
 .isEmail().withMessage("Invalid email format")
 //
];
 
// 2. run those rules.
 await Promise.all(rules.map(rule=>rule.run(req)))

 //3. check if there are errors after running the rules.
var  validationErrors = validationResult(req);

//4. If errors, return the error message
if(!validationErrors){
    return res.render('jobs',{
        errorMessage:validationErrors.array()[0],
    });

}
next();

}

export default userValidation


