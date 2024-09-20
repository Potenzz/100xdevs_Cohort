const z = require('zod');


const schemaCreateTodo = z.object({
    title:z.string(),
    description:z.string().max(60)
});


const schemaUpdateTodo = z.object({
    id:z.string(),
    completed:z.boolean()
}); 

module.exports = {
 createTodo : schemaCreateTodo,
 updateTodo : schemaUpdateTodo
}