const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());


//Typical mongodb link : mongodb+srv://<username>:<password>@<cluster-url>/<database>?<options>

mongoose.connect("url")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('users', UserSchema);


app.post("/signup", async (req, res) => {
    const { username, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ email: username });
        
        if (existingUser) {
            return res.status(400).send("Username already exists!");
        }

        const user = new User({
            name: name,
            email: username,
            password: password
        });

        await user.save();
        res.status(201).send("User created successfully");

    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Error creating user");
    }
});



app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error!");
});

app.listen(3000, () => {
    console.log("Server is runnign on port 3000")
})





