const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();
const z = require('zod');


// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // check if admin already created
    const existingAdmin = await Admin.findOne({ username: username });
    if (existingAdmin) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    await Admin.create({
        username : username,
        password : password
    })

    res.json({
        message : "Admin Created Successfully"
    })
});

// Define Zod schema for course validation
const courseSchema = z.object({
    title: z.string().min(1, "Title is required"),       // Title must be a non-empty string
    description: z.string().min(1, "Description is required"), // Description must be a non-empty string
    imageUrl: z.string().url("Invalid URL format"),      // Image URL must be a valid URL
    price: z.number().positive("Price must be a positive number"),  // Price must be a positive number
});

router.post('/courses', adminMiddleware, async (req, res) => {

    // Validate req.body using Zod
    const validationResult = courseSchema.safeParse(req.body);

    if (!validationResult.success) {
        // If validation fails, return the error messages
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResult.error.errors
        });
    }

    const { title, description, imageUrl, price } = validationResult.data;


    const  newCourse = await Course.create({
        title,description,imageUrl, price
    })

    res.json({
        msg:"Course Created successfully!",
        courseId: newCourse._id
    })


});

router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find();
    res.json({
        "Courses": response
    })
});

module.exports = router;