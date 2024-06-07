const mongoose=require('mongoose')
const Listing=require('../models/Listing')
const initData=require('./data')

async function  main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/lust')
    
}

main().then((resp)=>console.log(resp))
.catch((err)=>console.log(err))

// Listing.insertMany(initdata.data);

const initDB = async () => {
    await Listing.deleteMany({})
    initData.data=  initData.data.map((obj) => {
        return {
            ...obj,
            owner:'665dede239ecca5889e45ebf'
        }
    })
    await Listing.insertMany(initData.data)
    console.log("now data has been initialized with owner");
}

initDB()