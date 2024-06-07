const User=require('../models/user')
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body.user;
        let newUser = new User({
            username, email
        })
        let registerdUser = await User.register(newUser, password)
        // console.log(registerdUser);
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err)
            }
            req.flash('success', 'registered successfully')
        res.redirect('/listings')
        })
        
    } catch (er) {
        req.flash('error', er.message)
        res.redirect('/signup')
    }

}

module.exports.login=async (req, res) => {
    let { username, password } = req.body
    console.log(username, password);
    req.flash('success', 'you have logged in successfully!')
   let redirectUrl=res.locals.redirectUrl || '/listings'
    res.redirect(redirectUrl)
}

module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash('success','you have logged out successfully')
        res.redirect('/listings');
    })
}