// In Recoil, an atomFamily is a way to create multiple atoms dynamically,  based on parameters.
// Think of it like a function that generates unique atoms on demand. This is useful when you
// need a set of related states without manually creating multiple atoms for each possible state.


// In my words, We can dynamically create no of atoms of same kind of items, and access them with their each ids/key.

// Usage:

// The Todos.jsx file, it is acting as database here, just for example

export const TODOS = [{
    id: 1,
    title: "Go to Gym",
    description: "Hit the gym from 7-9"
}, {
    id: 2,
    title: "Go to eat food",
    description: "Eat food from from 9-11"
},]


// in atoms.jsx file, 
import { atomFamily } from "recoil";
import { TODOS } from "../Todos";

export const todosAtomFamily = atomFamily({
    key:'todosAtomFamily',
    default : id => {
        return TODOS.find(x => x.id == id)
    }
})


// In App.jsx:
import { RecoilRoot, useRecoilState } from 'recoil';
import { todosAtomFamily } from './store/atoms';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({id}) {
   const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
//    Here, accordint to the use/call , the recoil would create atoms, s

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  )
}
