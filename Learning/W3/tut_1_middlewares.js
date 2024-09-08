const express = require('express');

const app = express();

// MIDDLEWARES : 

// here, if i have to make another http call, then i need to right the code again, for auth.. Hence this is bad approach.

app.get("/health-checkup", function (req, res) {

    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    if(username!="Vishnu" || password!="pass"){
        res.status(403).json({
            msg:"User doesn't exist"
        });
        return; 
    }

    if(kidneyId!=1 && kidneyId!=2){
        res.status(411).json({
            mgs:"Kidney has wrong input no."
        });
        return;
    }

    res.send("Your health is perfect.");
});



// Instead, use them as middleware, which can be used again and again. 
// Middleware -Middleware in Express (and other web frameworks) is a function that sits between the request and the response cycle of your application.

// Middleware can be called multiple times, but need to use "next", so the express can understand.


function middlewareFunction(req, res, next) {
    // Perform some operation, like logging or checking authentication
    next();  // Call next to pass control to the next middleware/route handler
  };
  


app.get("/health-checkup", middlewareFunction, function (req, res) {
    res.send("xyz")
});


// so, whenever the endpoint will be accesses the middleware func will be implied itself.
// anotherw way of implying middleware func to each endpoint is by app.use(middleware), and any endpoint written after this line, will be accessign middleware by itself. 

app.use(middlewareFunction);



// GLOBAL CATCHES of exceptions and erros : 

app.use(function(err, req, res, next){
    res.status(500).send();
});







