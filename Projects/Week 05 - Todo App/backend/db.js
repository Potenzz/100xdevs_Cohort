const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.mongoDBurl)
.then(()=>console.log("Connected to MongoDB."))
.catch(err =>console.error("MongoDB Connection Error : ", err) );


const TodoSchema = new mongoose.Schema({
    title : String, 
    description : String,
    completed : Boolean,
});


const todo = mongoose.model('todos', TodoSchema);

module.exports = {
    todo
}