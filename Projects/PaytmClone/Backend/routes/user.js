const express = require("express");
const { userSignUpSchema } = require("../zod_types");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
const bcrypt = require('bcrypt');


const router = express.Router();



router.post("/signup", async (req, res) => {
    payload = req.body();
    parsedPayload = userSignUpSchema.safeParse(payload);

    // reject, if input not corrected as per zod.
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"You sent Wrong Inputs.",
            errors: parsedPayload.error.errors
        });
        return;
    }

    // check if user exists or not
    try{
        const user = await User.findOne({username: parsedPayload.username});

        if(user){
            res.status(409).json({
                msg:"Username already taken!"
            })
            return;
        }else{
            // if not exists, then create one.
            try{
                const hashedPassword = await bcrypt.hash(parsedPayload.password, 10);

                new_user = await User.create({
                    username : parsedPayload.username,
                    password : hashedPassword,
                    first_name : parsedPayload.first_name,
                    last_name : parsedPayload.last_name,
                })

                const token = jwt.sign({
                    userId : new_user._id
                }, JWT_SECRET)

                res.status(201).json({
                    msg : "User Created Successfully",
                    token : token 
                })

            }catch(err){
                res.status(500).json({
                    msg:"Server Error! Couldn't Signup"
                })
            }
        }

    } catch(err){
        console.error("Error checking user existence", err);
        res.status(500).json({
            msg:"Couldn't check if user exists or not, Try again!"
        })
        return;
    }


})

module.exports = router;
