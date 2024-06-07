const Listing = require('./models/Listing');
const Review=require('./models/review')

module.exports.isloggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {

        req.session.redirectUrl = req.originalUrl;
        console.log(req.originalUrl);
        req.flash("error", "you must be logged in to create listing")
        return res.redirect('/login')
    }
    next()
}

module.exports.saveredirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        console.log(req.session.redirectUrl);
        res.locals.redirectUrl = req.session.redirectUrl;
        console.log(res.locals.redirectUrl);
    }
    next();
}

module.exports.isReview

module.exports.isOwner = async (req, res, next) => {
    let {id}=req.params
     let listing = await Listing.findById(id);
        
         if (!listing.owner._id.equals(res.locals.currUser._id)) {
             req.flash('error', 'you dont have permission to edit')
             return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId } = req.params
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
             req.flash('error', 'you dont have permission to edit review')
             return res.redirect(`/listings/${id}`);
    }
    next();
}