import { useState } from 'react'
//hook



function App() {
    const [todos, setTodos] = useState([
        {
            title: "go to gym",
            description: "from 4-5",
            completed: true
        },
        {
            title: "go to market",
            description: "from 6-7",
            completed: false
        }
    ]);

    return (
        <CustomButton todos={todos} setTodos={setTodos}></CustomButton>
    )

}


// component

function addTodo(props) {
    props.setTodos([...props.todos, {
        title: "New todo",
        description: "from new time",
        completed: false
    }])
}


function CustomButton(props) {


    return (<div>
        <button onClick={() => addTodo(props)}> Add a new Todo</button>
        {
            props.todos.map(function (todo) {
                return <Todo title={todo.tite} description={todo.description} />
            })
        }
    </div>
    )
};

// / Todo component to render each todo item
function Todo({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default App

