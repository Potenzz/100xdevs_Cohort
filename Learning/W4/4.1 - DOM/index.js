const express = require("express")
const cors = require('cors');


const app = express()

app.use(cors());


app.get("/sum", function(req, res){
    const a=req.query.a;
    const b=req.query.b;
    let sum = parseInt(a)+parseInt(b);
    res.send(sum.toString());
})



app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error!");
});

app.listen(3000, () => {
    console.log("Server is runnign on port 3000")
})
