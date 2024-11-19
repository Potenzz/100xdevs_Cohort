"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL_PG
});
const connect_db = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connected to the Database!");
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error executing query', err.message);
        }
        else {
            console.error('An unknown error occurred', err);
        }
    }
});
const runQuery = (q, values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connect_db();
        const result = yield client.query(q, [values]);
        if (result.rows.length > 0) {
            console.log(`User Found: ${JSON.stringify(result.rows[0], null, 2)}`);
            return result.rows[0];
        }
        else {
            console.log("NO user found with this given email.");
            return null;
        }
        ;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error executing query', err.message);
        }
        else {
            console.error('An unknown error occurred', err);
        }
    }
    finally {
        yield client.end();
        console.log("Database conenction closed!");
    }
    ;
});
// ------------------------------- command 1. - CREATING TABLE
const createUsersTable = `CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(55) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL, 
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )`;
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
const insertValues = ['john_doe', 'johndoe@example.com', 'securepassword123'];
// runQuery(insertUserData2, insertValues);
// ------------------------------------- Command 3 - GETTING DATA
const getUser = `
    SELECT * 
    FROM users 
    WHERE email = $1;
`;
const email = "johndoe@example.com";
runQuery(getUser, email);
