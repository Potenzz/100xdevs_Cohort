// We used Static Database, just to use/know atomFamily, but in case to access actual database, 
// we need to use SelectorsFamily



// atoms.jsx

import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async ({get}) => {
      const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
      return res.data.todo;
    },
  })
});


// app.jsx

import { RecoilRoot, useRecoilState } from 'recoil';
import { todosAtomFamily } from './store/atoms';


function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={2} />
    <Todo id={2} />
  {/* Still , recoil would make only 2 request, not three, as id=2 refers to only one atom, and recoil handles that. */}
  </RecoilRoot>
}

function Todo({id}) {
   const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
   

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  )
}

export default App