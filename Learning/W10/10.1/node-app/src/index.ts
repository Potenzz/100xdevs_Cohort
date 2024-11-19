import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { get } from 'mongoose';
dotenv.config();

const client = new Client({
    connectionString:process.env.DATABASE_URL_PG
});

const connect_db = async() => {
    try{
        await client.connect();
        console.log("Connected to the Database!")
    }catch(err){
        if (err instanceof Error) {
            console.error('Error executing query', err.message);
        } else {
        console.error('An unknown error occurred', err);
        }
    }
}


const runQuery = async (q:string, values: string) =>{
    try{
        connect_db();
        
        const result = await client.query(q, [values]);

        if (result.rows.length > 0){
            console.log(`User Found: ${JSON.stringify(result.rows[0], null, 2)}`);
            return result.rows[0];
        }else{
            console.log("NO user found with this given email.")
            return null;
        };

    }catch(err){
        if (err instanceof Error) {
            console.error('Error executing query', err.message);
        } else {
        console.error('An unknown error occurred', err);
        }
    }finally{
        await client.end();
        console.log("Database conenction closed!")
    };
};

// ------------------------------- command 1. - CREATING TABLE
const createUsersTable = `CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(55) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL, 
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )`
// runQuery(createUsersTable);




// ------------------------------- command 2: INSERTIGN DATA
const insertUserData = `
    INSERT INTO users (username, email, password)
    VALUES ('Jhon', 'jhone@gmail.com', 'passwordme')
    RETURNING id, username, email;
`;
// runQuery(insertUserData)

// this is not the right way to give queries, the user given values should not be the part of query, 

// preivous code:
// const runQuery = async (q:string): Promise<void> =>{
//     const result = await client.query(q);
//     console.log("Query executed successfully:",result);

// instead send them separately with this kind of code:
// const runQuery = async (q:string, values: any[]): Promise<void> =>{
//     const result = await client.query(q, values);


// So with the updated code, we will give query like this:

const insertUserData2 = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email;
`;
const insertValues = ['john_doe', 'johndoe@example.com', 'securepassword123']
// runQuery(insertUserData2, insertValues);





// ------------------------------------- Command 3 - GETTING DATA

const getUser = `
    SELECT * 
    FROM users 
    WHERE email = $1;
`

const email = "johndoe@example.com"

runQuery(getUser, email)

// runQuery at this moment:
// const runQuery = async (q:string, values: string) =>{
//         const result = await client.query(q, [values]);

//         if (result.rows.length > 0){
//             console.log(`User Found: ${JSON.stringify(result.rows[0], null, 2)}`);
//             return result.rows[0];
//         }else{
//             console.log("NO user found with this given email.")
//             return null;
//         };
