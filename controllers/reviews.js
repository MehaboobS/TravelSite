const Review = require('../models/review')
const Listing=require('../models/Listing')

module.exports.createReview = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
   
    let { rating, comment } = req.body.review
    let newReview = new Review({
        rating: rating,
        comment:comment
    })
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save()

    await listing.save();
    req.flash('success','new review created successfully')
    res.redirect(`/listings/${id}`);

}

module.exports.destroyReview=  async (req, res) => {
        let { id, reviewId } = req.params
         let listing = await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
        // requiredList=requiredList.reviews.filter((review)=>review.id!==reviewId)
        let result = await Review.findByIdAndDelete(reviewId)
        console.log(result)  
        req.flash('success','review deleted successfully')

        res.redirect(`/listings/${id}`);
    }