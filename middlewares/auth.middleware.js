export const auth = (req,res,next) =>{
    if(req.session.userEmail){
        console.log("im auth")
        next();
    }
    else{
        res.redirect('/login');
    }
}