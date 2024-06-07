const express = require('express')
const router = express.Router()
const { listingschema } = require('../schema.js');
const wrapAsync=require('../utils/wrapAsync')
const ExpressError = require('../utils/ExpressError.js')
const Listing = require('../models/Listing.js')
const { isloggedIn,isOwner } = require('../middleware.js');
const { populate } = require('../models/review.js');
const listingcontroller=require('../controllers/listings.js')


const validateSchema=(err,req,res,next)=>{
    let {error}=listingschema.validate(req.body);
    if(error) {
        let errMsg=err.details.map((el)=>el.message).join(',');
        throw new ExpressError(400,errMsg)
    }
    else {next()};    
}

router.get('/',wrapAsync(
    listingcontroller.index
))

router.get('/new',isloggedIn, listingcontroller.renderNewForm)

router.get('/:id',wrapAsync(
    listingcontroller.showListing
))

router.get('/:id/edit',isloggedIn,isOwner,wrapAsync(
    listingcontroller.renderEditForm
))
router.post('/',
    isloggedIn,
validateSchema,
wrapAsync(
   listingcontroller.createListing
)) 

router.put('/:id',isloggedIn,isOwner,validateSchema,wrapAsync(
   listingcontroller.updateListing
))

router.delete(('/:id'),isloggedIn,isOwner,listingcontroller.destroyListing)
router.get('/trending', listingcontroller.trendingListing);
module.exports = router;

