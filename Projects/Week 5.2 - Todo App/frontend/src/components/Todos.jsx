export function Todos({todos, setTodos}){
    async function handleTodoComplete(_id, currentStatus ){
        const response = await fetch(`http://localhost:3000/completed`, {
            method: "PUT",
            body: JSON.stringify({
                id: _id,
                completed:!currentStatus
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();
        console.log(json)
        if (response.ok) {
            // Update the local state to reflect the new completion status
            setTodos((prevTodos) =>
                prevTodos.map(todo =>
                    todo._id === _id ? { ...todo, completed: !currentStatus } : todo
                )
            );
        } else {
            console.error("Failed to update todo:", json);
        }

    }
    return <div>
            {
                todos.map(function(todo){
                    return <div
                        key={todo._id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={()=>handleTodoComplete(todo._id, todo.completed)}>
                        {todo.completed == true ? "Completed" : "Mark to complete"}</button>
                    </div>
                })
            }
        </div>
}