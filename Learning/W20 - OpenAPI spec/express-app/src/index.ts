import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let users = [
    { id: 1, name: "jhon doe"},
    { id: 2, name: "jane doe"}
];

app.get("/users", (req, res)=>{
    const {name} = req.query;

    if(typeof name==="string"){
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
        res.json(filteredUsers);
    }else{
        res.json(users)
    }
});

app.listen(port, ()=>{
    console.log(`Server is runnign on port ${port}`)
});