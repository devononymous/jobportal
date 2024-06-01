
import { body, validationResult } from "express-validator"


const applicantValidation = async(req,res,next)=>{
const rules = [
 body('applicantName').isEmpty().withMessage("Name is required"),
 body('applicantEmail')
 .isEmpty().withMessage("Email is required")
 .isEmail().withMessage("Invalid email format"),
 body('applicantResume')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Resume file is required');
      }
      return true;
    })
    .isMimeType('application/pdf').withMessage('Resume can be any doc format') //
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

export default applicantValidation


