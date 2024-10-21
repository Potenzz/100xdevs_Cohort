const mongoose = require("mongoose");


mongoose.connect(process.env.mongo_db_url)
.then(()=>console.log("Connected To MongoDB."))
.catch(err=>console.log("MongoDB Connection Error : ", err))

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required."],
        trim: true,
        maxlength: [50, "First name cannot exceed 50 characters."]
    },
    last_name: {
        type: String,
        required: [true, "Last name is required."],
        trim: true,
        maxlength: [50, "Last name cannot exceed 50 characters."]
    },
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, "Username must be at least 3 characters long."],
        maxlength: [30, "Username cannot exceed 30 characters."],
        match: [/^[a-zA-Z0-9._-]+$/, "Username can contain letters, numbers, dots, underscores, and hyphens only."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least 6 characters long."]
    }
}, {
    timestamps: true 
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required."],
    },
    balance: {
        type: Number,
        required: [true, "Balance is required."],
        min: [0, "Balance cannot be negative."],
    }
}, {
    timestamps: true // Adds `createdAt` and `updatedAt` timestamps
});




const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", accountSchema)


module.exports = {
    User,
    Account
}



