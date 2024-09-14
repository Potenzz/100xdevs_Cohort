const mongoose = require('mongoose');
const { string } = require('zod');

// Connect to MongoDB
const mongoUrl = "mongodb+srv://admin:dbVishnu@mybasiccluster.vhvsa.mongodb.net/course_selling_app"
mongoose.connect(mongoUrl);



// Define schemas
const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
});

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'  
    }] 
});

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    imageUrl : String,
    price : Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}