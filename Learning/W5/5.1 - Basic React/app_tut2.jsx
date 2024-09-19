import { useState } from 'react' 
//hook



function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CustomButton count={count} setCount={setCount}></CustomButton>
    </div>
  )
  
}

// component
function CustomButton(props){

  function onClickHandler(){
    props.setCount(props.count + 1);
  }

  return <button onClick={onClickHandler}> Counter {props.count}</button>
}

export default App

