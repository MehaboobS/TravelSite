const mongoose = require('mongoose')
const passportlocalmongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    }
})
userSchema.plugin(passportlocalmongoose);

const User = new mongoose.model('user', userSchema);



module.exports = User;