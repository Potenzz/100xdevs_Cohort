const express = require("express");
const port = 3000; 
const app = express();  

// Check "localhost:3000" on your browser to observe this."

app.get('/who-are-you', function(req, res) {
    //req takes headers, body, parametere, and res sends it.
    res.send("Hello I'm Vishnu's bot!")
})

app.get('/', function(req, res) {
    res.send("Hello World!")
})


app.listen(port, function() {
    console.log(`Example app is listing on port ${port}`)
}) 
z
