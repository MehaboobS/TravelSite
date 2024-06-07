const express=require('express')
const mongoose=require('mongoose')
const app=express();
const port=8000
const Listing = require('./models/Listing.js')
const Review=require('./models/review.js')
const listings = require('./routers/listing.js')
const reviews=require('./routers/review.js')
const methodOverride = require('method-override')
const ejsMate=require("ejs-mate")
const path=require('path')
const wrapAsync=require('./utils/wrapAsync')
const ExpressError=require('./utils/ExpressError.js')
const Joi = require('joi');
const { listingschema } = require('./schema.js');
const { reviewschema } = require('./schema.js');
const { measureMemory } = require('vm');
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user.js')
const userRouter=require('./routers/user.js')

app.listen(port,()=>{
    console.log('request accepted at the port',port);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/lust')
}

main().then((resp)=>console.log('connection successfully done'))
.catch((err)=>console.log(err));

app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));

// app.get('/test',(req,res)=>{
//     let sample=new Listing({
//            title:"villa the maharaje",
//            description:"villa for a king and queens",
//            image:"url",
//            prize:30000,
//            location:"napa-valley",
//            country:"India",
//     })
//     sample.save()
//     console.log(sample);
//     res.send('successfully connected to database');
// })


app.use(session({
    secret: "mysupersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
}));

app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    res.locals.currUser = req.user;
    next();
})
app.get('/demouser',async (req, res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username:"delta-student"
    })
    let newRegisteredUser = await User.register(fakeUser, "helloworld");
    console.log(newRegisteredUser);
    res.send(newRegisteredUser);
})

app.use('/listings', listings);



app.use('/listings/:id/review', reviews);

app.use('/', userRouter);
app.all('*',(req,res,next)=>{
    next(new ExpressError(404,'page not found'));
})
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err
    // res.status(statusCode).send(message);
    let error={
        statusCode:statusCode,
        message:message,
    }
    res.render('error.ejs',{error});

})


// app.use((err,req,res,next)=>{
//     res.send('something went wrong');
// })

