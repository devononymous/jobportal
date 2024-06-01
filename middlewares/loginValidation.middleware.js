
import { validationResult, check } from 'express-validator';

 const loginValidation = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email'),
      
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('jobDetails', { job: req.job, errors: errors.array() });
        }
        next();
    }
];

export default loginValidation
