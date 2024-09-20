const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());



app.post('/todos', async function(req, res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    // reject, if input not corrected as per zod.
    if(!parsedPayload.success){
        console.log("Validation error:", parsedPayload.error.errors); 
        res.status(411).json({
            msg:"You sent Wrong inputs.",
            errors: parsedPayload.error.errors
        });
        return;
    }

    // else, put it in mongo
    new_data = await todo.create({
        title:createPayload.title,
        description: createPayload.description,
        completed:false,
    });

    res.json({
        msg:"Todo has been created successfully",
        todo:new_data
    })

});


app.get('/todo', async function(req, res){
    const todos = await todo.find();
    res.json({
        todos
    })


});


app.put('/completed', async function(req, res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    // reject, if input not corrected as per zod.
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"You sent Wrong inputs."
        });
        return;
    }

    await todo.updateMany({
        _id:req.body.id,
    },{
        completed:req.body.completed
    })

    res.json({
        msg:"Todo is marked as completed."

    })

});




const PORT = 3000;

// 404 Error handler (for unmatched routes)
app.use((req, res, next) => {
    res.status(404).send("This url is not Found");
});
// Error handling middleware (for internal server errors)
app.use(function (err, req, res, next) {
    console.error(err.stack);   
    res.status(500).send("Internal Server Error!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
