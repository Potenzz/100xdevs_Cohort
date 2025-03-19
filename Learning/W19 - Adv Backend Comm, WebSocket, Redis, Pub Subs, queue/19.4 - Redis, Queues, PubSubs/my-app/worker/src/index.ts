import { createClient } from "redis";
const client = createClient();
client.on('error', (err => console.log("Redis Client Error", err)))

async function processSubmission(submission:string){
    const {problemId, code, language} = JSON.parse(submission);

    console.log(`Processing the submisson for problemId ${problemId} ...`);
    console.log("Code", code);
    console.log("Language", language);

    //here you will run the actual logic of running the code.
    //instead of running, here i'm simulating proccessing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`Finished the submisson for problemId ${problemId} ...`);
}

async function startWorker(){
    try{
        await client.connect();
        console.log("Connected to Redis");

        while(true){
            try{
                const submission = await client.brPop("problems", 0);

                //@ts-ignore
                await processSubmission(submission?.element)

            }catch(e){
                console.log("Error processing submission", e)
                // put this problem back to the queue, 
                // log the error to a file, to fix it
            }
        }
    }catch(e){
        console.log("Error while connection to Redis: ", e)
    }
}
startWorker();