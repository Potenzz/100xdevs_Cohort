// When you fetch data asynchronously in Recoil using selectors or atoms, the state could be in one of three conditions:

// Loading: Data is being fetched.
// Has Value: Data was successfully fetched.
// Has Error: An error occurred during fetching.

// A Loadable makes it easy to handle these states gracefully in your UI.
// in my words, while loading the data from backend, this is used to show a dummy ui to user, till user is waiting.


//  app.jsx

import './App.css'
import { RecoilRoot, useRecoilStateLoadable } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({id}) {
   const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));

    // stateLoadable: A Loadable object with state (loading, hasValue, hasError) and contents (the value or error).
    // setState: A function to update the atom/selector value.

    const todoLoadable = useRecoilValueLoadable(todosAtomFamily(id));
    // only,  stateLoadable: A Loadable object with state (loading, hasValue, hasError) and contents (the value or error).


   if (todo.state === "loading") {
      return <div>loading</div>
   }
   
   return (
    <>
      {todo.contents.title}
      {todo.contents.description}
      <br />
    </>
  )
}

export default App


// atoms.jsx

import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async ({get}) => {
      await new Promise(r => setTimeout(r, 5000));
      const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
      return res.data.todo;
    },
  })
});

//