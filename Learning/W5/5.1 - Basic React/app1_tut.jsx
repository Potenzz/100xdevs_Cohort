import { useState } from 'react' 
//hook



function App() {
  const [count, setCount] = useState(0);

  function updateValue(){
    setCount(count + 1);
  }

  return (
    <div>
      <button onClick={updateValue}>Counter {count}</button>
    </div>
  )
}

export default App
