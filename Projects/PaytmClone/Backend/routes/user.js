const express = require("express");
const { userSignUpSchema, userSigninSchema, userUpdateSchema} = require("./zod_types");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
const bcrypt = require('bcrypt');
const { authMiddleware } = require("../middleware");
const mongoose = require('mongoose'); // Import mongoose


const router = express.Router();


router.post("/signup", async (req, res) => {
    const payload = req.body;
    const parsedPayload = userSignUpSchema.safeParse(payload);

    // reject, if input not corrected as per zod.
    if(!parsedPayload.success){
        return res.status(411).json({
            msg:"You sent Wrong Inputs.",
            errors: parsedPayload.error.errors
        });
    }

    // check if user exists or not
    try{
        const user = await User.findOne({username: parsedPayload.data.username});

        if(user){
            return res.status(409).json({
                msg:"Username already taken!"
            })
        }else{
            // if not exists, then create one.
            try{
                const hashedPassword = await bcrypt.hash(parsedPayload.data.password, 12);

                const newUser = await User.create({
                    username : parsedPayload.data.username,
                    password : hashedPassword,
                    first_name : parsedPayload.data.first_name,
                    last_name : parsedPayload.data.last_name,
                })

                const userId = newUser._id;
                
                await Account.create({
                    userId,
                    balance: 1 + Math.random() * 10000
                })

                const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { algorithm: "HS256"});


                return res.status(201).json({
                    msg : "User Created Successfully",
                    token : token 
                })

            }catch(err){
                console.log(err)
                return res.status(500).json({
                    msg:"Server Error! Couldn't Signup"
                });
            }
        }

    } catch(err){
        console.error("Error checking user existence", err);
        res.status(500).json({
            msg:"Couldn't check if user exists or not, Try again!"
        });
    }


})


router.post("/signin", async (req, res) => {
    const payload = req.body;
    const parsedPayload = userSigninSchema.safeParse(payload);

    // reject, if input not corrected as per zod.
    if(!parsedPayload.success){
        return res.status(411).json({
            msg:"You sent Wrong Inputs. Make sure the format is correct.",
            errors: parsedPayload.error.errors
        });
    }

    try {
        const user = await User.findOne({ username: parsedPayload.data.username });
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(parsedPayload.data.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid Password." });
        }

        // Generate JWT token on successful login
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { algorithm: "HS256" });

        return res.status(200).json({
            msg: "Login successful.",
            token: token
        });
    } catch (err) {
        console.error("Error during sign-in:", err);
        return res.status(500).json({ msg: "Server error. Please try again." });
    }
})


router.put("/", authMiddleware, async(req, res) => {
    const payload = req.body;
    const parsedPayload = userUpdateSchema.safeParse(payload);

    // reject, if input not corrected as per zod.
    if(!parsedPayload.success){
        console.log(err)
        return res.status(411).json({
            msg:"You sent Wrong Inputs.",
            errors: parsedPayload.error.errors
        });
    }

    try{
        const userId = req.user.userId; 
        const result = await User.updateOne(
            { _id: new mongoose.Types.ObjectId(userId) },
            { $set: parsedPayload.data }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ msg: "User not found or no changes made." });
        }
        return res.status(200).json({ msg: "User updated successfully." });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Internal Server Error, Try again later!"
        })
    }
})


router.get("/bulk", async(req, res)=>{
    const filter = req.query.filter || "";
    console.log(`Searching for: ${filter}`);

    try{
    const users  = await User.find({
        $or : [
            {
                first_name:{"$regex":filter, "$options": "i"}
            },
            {
                last_name:{"$regex":filter, "$options": "i"}
            }
        ]
    });

    console.log(users)

    return res.json({
        user : users.map(user=>({
            username:user.username,
            first_name:user.first_name,
            last_name:user.last_name,
            _id:user._id
        }))
    })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Internal Server Error, Try again later!"
        })
    }
})

module.exports = router;
