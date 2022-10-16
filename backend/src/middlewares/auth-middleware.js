const passport = require('passport');

exports.userAuth = passport.authenticate('jwt', { session: false });


exports.authPage = (permissions) => {
    return (req, res, next) => {
        console.log("req.user.role : " + req.user.role);
        console.log("permission : " + permissions);
        const userRole = req.user.role;
        if (permissions.includes(userRole)){
            next();
        }else{
            return res.status(401).json("You don't have permissions to access.")
        }
    }
}