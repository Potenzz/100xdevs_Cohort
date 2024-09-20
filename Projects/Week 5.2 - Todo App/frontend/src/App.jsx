import { useState, useEffect } from 'react';
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {

  const [todos, setTodos] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/todo")
        .then(async (res) => {
            const json = await res.json();
            setTodos(json.todos); // Access `todos` from the response
        })
        .catch(err => console.error(err));
}, []); // Empty dependency array ensures this runs once on mount



  return (
      <div>
        <CreateTodo todos={todos} setTodos={setTodos}></CreateTodo>
        <Todos todos={todos} setTodos={setTodos}></Todos>
      </div>
  )
}

export default App
