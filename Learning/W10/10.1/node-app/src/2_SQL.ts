import { Client } from 'pg';
import * as dotenv from 'dotenv';
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


const runQuery = async (q:string, id: number) =>{
    try{
        connect_db();
        
        const result = await client.query(q, [id]);
        console.log(result.rows);



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


// ------------------ using Relationships -------------


// --------------------- 1. Creating Addresses table with relation to users table. 

const CreateAddressTable = `CREATE TABLE addresses(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20),
    country VARCHAR(100) DEFAULT 'INDIA',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);`
// runQuery(CreateAddressTable)

// runQuery at this moment:
// const runQuery = async (q:string) =>{
//         const result = await client.query(q);


// ----------------------- 2. INSERTING DATA in Addresses table.

const insert_q = `INSERT INTO addresses (user_id, street, city, state, pincode) 
    VALUES ($1, $2, $3, $4, $5);
`
const insert_values = [1, '123 Main St', 'Springfield', 'IL', '62704'];
// runQuery(insert_q, insert_values);

// run query at this moment:

// const runQuery = async (q:string, values: any[]) =>{
//         const result = await client.query(q, values);


// ------------------------ 3. Using Joins ------------ 

const join_q = `
SELECT u.id, u.username, u.email, a.street, a.state, a.city, a.pincode, a.country
FROM users u
JOIN addresses a ON u.id = a.user_id
WHERE u.id = $1;`

const given_userid = 1;
// runQuery(join_q, given_userid)

// runQuery at this moment
// const runQuery = async (q:string, id: number) =>{
//         const result = await client.query(q, [id]);
//         console.log(result.rows);