
import { validationResult, check } from 'express-validator';

 const applicantValidation = [
    check('applicantName').notEmpty().withMessage('Name is required'),
    check('applicantEmail').isEmail().withMessage('Invalid email'),
    check('applicantResume').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Resume file is required');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('jobDetails', { job: req.job, errors: errors.array() });
        }
        next();
    }
];


export default applicantValidation



