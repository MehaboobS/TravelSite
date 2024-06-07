const Listing=require('../models/Listing')

module.exports.index = async (req, res) => {
        const allListings =   await Listing.find({})
        res.render('./listings/index.ejs',{allListings});
}

module.exports.renderNewForm=(req, res) => {
    
    res.render('listings/new.ejs')
}

module.exports.showListing= async (req,res)=>{
        let {id}=req.params
        let requiredList = await Listing.findById(id).populate({path: "reviews",populate:"author"}).populate('owner')
    // let data;
    // function whether(country) {
    //     fetch(`https://api.weatherapi.com/v1/current.json?key=af7df9fb4f1b463283d55634241702&q=${country}`).then((resp) => { return resp.json() })
    //         .then((respData) => data = respData)
    //         .catch((err) => console.log(err));
    // }
    // whether(requiredList.country)
    // console.log(data);
        if (!requiredList) {
            req.flash('error', 'listing you searched does not exists')
            res.redirect('/listings')
        }
       
        res.render('./listings/show.ejs',{requiredList});
}
    
module.exports.createListing= async (req,res,next)=>{
      
        const newListing= new Listing(req.body.listing);
        console.log(req.user);
        newListing.owner = req.user._id;
        await newListing.save()
        req.flash('success', 'new listing created!')
       
        res.redirect('/listings');
}
    
module.exports.renderEditForm=async (req,res)=>{
        let {id}=req.params
        console.log(id);
        let requiredList = await Listing.findById(id);
        
        res.render('./listings/edit.ejs',{requiredList});
}
    
module.exports.updateListing= async (req,res)=>{
        let { id } = req.params;
        // let listing = await Listing.findById(id);
        
        // if (!listing.owner._id.equals(res.locals.currUser._id)) {
        //     req.flash('error', 'you dont have permission to edit')
        //     return res.redirect(`/listings/${id}`);
       
        // }
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        req.flash('success','listing updated successfully')
        res.redirect(`/listings/${id}`);
       
        
}
    
module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','listing deleted successfully')
    res.redirect('/listings');
}

module.exports.trendingListing = (req, res) => {
    console.log('i am in trending session')
    res.redirect('/listings/trending.ejs')
}