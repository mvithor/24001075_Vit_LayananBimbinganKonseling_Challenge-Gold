const isLogin = (req,res, next) => {
    if(req.session.loggedin === true){
        next();
        return;
    } else {
        req.session.destroy( (err) =>{
            res.redirect('/auth');
        })
    }
}
const isLogout = (req, res, next) => {
    if(req.session.loggedin !== true) {
        next();
        return;
    }
    res.redirect('/');
}

module.exports = {
    isLogin,
    isLogout
}