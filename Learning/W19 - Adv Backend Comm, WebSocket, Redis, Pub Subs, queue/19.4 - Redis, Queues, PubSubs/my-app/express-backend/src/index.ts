import express from "express";
import { createClient } from "redis";


const app = express();
app.use(express.json())

const client = createClient();
// Equivalent to createClient({ url: "redis://localhost:6379" })

client.on('error', (err => console.log("Redis Client Error", err)))


app.post("/submit", async (req, res) => {
    const {problemId, code, language} = req.body;

    try{
        await client.lPush("problems", JSON.stringify({code, language, problemId}))
        // store in database
        res.status(200).send("Submission received and stored.");
    }catch(e){
        console.error("Redis Error", e);
        res.status(500).send("Failed to store submission")
    }
})

async function startServer(){
    try{
        await client.connect();
        console.log("Connected to Redis");

        app.listen(3000, ()=> {
            console.log("Server is running on port 3000");
        })
    }catch(e){
        console.log("Error while connection to Redis: ", e)

    }
}

startServer();