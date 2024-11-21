// Small Exercise based on express usage, and used local storage as db.

const express = require('express');
const app = express();



var users = [{
    name:"Hero",
    kidneys:[{
        healthy : false
    },{
        healthy : true
    }]

}];

app.use(express.json());


app.get("/", function(req, res) {

    const noOfTotalKidneys = users[0].kidneys.length;
    const healthyKidneys = users[0].kidneys.filter(kidney => kidney.healthy == true);
    const noOfHealthyKidneys = healthyKidneys.length;
    let noOfUnHealthyKidneys = noOfTotalKidneys - noOfHealthyKidneys;

    res.json({
        noOfTotalKidneys,
        noOfHealthyKidneys,
        noOfUnHealthyKidneys
    })
    

});

// adding kidneys
app.post("/", function(req, res){
    const ishealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:ishealthy
    })
    res.json({msg : "Done!"})
})

// making all kidneys healthy
app.put("/", function(req, res){
    for (let i=0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({msg : "All kidneys updated to healthy"});

})

//Removing all unhealthy kidneys
app.delete("/", function(req, res){
    
    let newKidneys = [];

    for(let i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy==true){
            newKidneys.push({
                healthy : true
            })
        }}
    users[0].kidneys = newKidneys;
    res.json({msg:"Done"})
    
})

app.listen(3000);