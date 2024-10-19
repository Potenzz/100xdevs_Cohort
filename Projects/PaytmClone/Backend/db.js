const mongoose = require("mongoose");
require('dotenv').config();


mongoose.connect(process.env.mongo_db_url)
.then(()=>console.log("Connected To MongoDB."))
.catch(err=>console.log("MongoDB Connection Error : ", err))


const UserSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true, 
        trim: true,
        maxLength: 50
    },
    last_name : {
        type : String,
        required : true, 
        trim: true,
        maxLength: 50
    },
    username : {
        type : String,
        required : true, 
        unique:true,
        trim: true,
        lowercase:true,
        minLength: 3, 
        maxLength: 30
    },
    password : {
        type : String,
        required : true, 
        minLength: 6
    }
})


const User = mongoose.model("User", UserSchema);


module.exports = {
    User
}



