const mongoose = require('mongoose')
const Review = require('./review')
const User=require('./user')

const listingScheme=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:"https://www.istockphoto.com/photo/3d-rendering-of-forest-house-during-sunset-gm1516938157-524327351?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fvilla&utm_medium=affiliate&utm_source=unsplash&utm_term=villa%3A%3A%3A"
        
    },
    prize:{type:Number},
    location:{type:String},
    country: { type: String },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

listingScheme.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
    
})


const Listing= new mongoose.model("listing",listingScheme);

module.exports=Listing;