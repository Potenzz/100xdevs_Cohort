const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require("../db");
const jwt = require('jsonwebtoken');
const jwt_secret = require('../config')



// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // check if admin already created
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    await User.create({
        username : username,
        password : password
    })

    res.json({
        message : "User Created Successfully"
    })
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.username;

    const _user = await User.find({
        username:username,
        password:password
    })
    
    if(_user){
        const token = jwt.sign({
            username:username
        }, jwt_secret );

        res.json({
            token
        });
    }else{
        res.status(411).json({
            message:"Incorrect Username or Password"
        })
    }

})

router.get('/courses', async (req, res) => {
    const response = await Course.find();
    res.json({
        "Courses": response
    })
});


router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.username;

    await User.updateOne({
        username:username},{
            "$push":{
                purchasedCourses:courseId
            }
    })

    res.json({message:"Purchase Completed!a"})

    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {

    const user = await User.findOne({
        username : req.username
    })

    const courses = await Course.find({
        _id : {
            "$in":user.purchasedCourses
        }
    })

    res.json({
        courses:courses
    })
});

module.exports = router