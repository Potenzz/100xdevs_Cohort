import { useState } from "react"

export function CreateTodo(props){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return(
        <div>
            <input style={{
                padding:10,margin:10
            }} type="text" placeholder="title" onChange={function(e){
                setTitle(e.target.value);
            }} /> <br />


            <input style={{
                padding:10,margin:10
            }}type="text" placeholder="description" onChange={function(e){
                setDescription(e.target.value);
            }}/> <br />


            <button style={{
                padding:10,margin:10, backgroundColor:"black", color:"white"
            }} onClick={async ()=>{
                const response = await fetch("http://localhost:3000/todos", {
                    method:"POST",
                    body:JSON.stringify({
                        "title" : title,
                        "description" : description
                    }),
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                
                const json = await response.json();


                // re-renderings

                props.setTodos([...props.todos, {
                    _id: json.todo._id,
                    title : title, 
                    description : description,
                    completed : false
                }]);

            }}>Add a Todo</button>
        </div>
    )
}
