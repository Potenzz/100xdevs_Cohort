const express = require('express');
const zod = require("zod");
const bodyParser = require("body-parser");


const app = express();

// const schema = zod.array(zod.number());
const schema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8)
});

app.use(bodyParser.json());



app.get("/health-checkup", function (req, res) {

    // const kidney = req.body.kidney;
    // const check = schema.safeParse(kidney)

    const check = schema.safeParse(req.body)

    res.send({
        check
    })
});


app.listen(3000)


