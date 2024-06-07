const express = require('express')
const router = express.Router({mergeParams:true})
const Review=require('../models/review.js')
const wrapAsync=require('../utils/wrapAsync')
const ExpressError = require('../utils/ExpressError.js')
const { listingschema } = require('../schema.js');
const { reviewschema } = require('../schema.js');
const Listing = require('../models/Listing');
const { isloggedIn, isReviewAuthor } = require('../middleware.js')
const reviewController=require('../controllers/reviews.js')
const validateReview = (err,req, res, next) => {
    let { error } = reviewschema.validate(req.body);
    if (error) {
        let errMsg = err.details.map((el) => el.message.join('-'))
        throw new ExpressError(400,errMsg)
    }
    else {
        next();
    }
}



router.post('/', isloggedIn, validateReview, wrapAsync(
   reviewController.createReview ))
router.delete('/:reviewId',isloggedIn,isReviewAuthor, wrapAsync(
  reviewController.destroyReview
))





module.exports=router