// While Managing the State Variable, always try to :
// Push the state as down as possible, 
// try to find Least Common Ancestors.



// Prop Drilling - Prop drilling in React refers to the process of passing data from a parent component down 
// through multiple levels of child components via props, even if some intermediate components do not need to
// use the data themselves. This can lead to unnecessary complexity and can make the code harder to maintain,



// Its typical code:

function App() {
    const [count, setCount] = useState(0);

    return (
    <>
    <Count count={count} setCount={setCount}></Count>
    </>
    )
}

function Count({count, setCount}){
    return <div>
        <CountRenderer count={count}/>
        <Button count={count} setCount={setCount}></Button>
    </div>

}

function CountRenderer({count}){
    return <div>{count}</div>
}

function Button({count, setCount}){
    return <div>
        <button onClick={()=>{
            setCount(count+1)
        }}>Increase</button>

        <button onClick={()=>{
            setCount(count-1)
        }}>Decrease</button>
    </div>

}



//----------------------------------------------------------------

// Instead of passing props like this, we can use ContextAPI..


// Create any file, and write there like this:
import { createContext } from "react";
export const countContext = createContext(0);

// for more stateVariables, we can write it like this as well
export const countContext2 = createContext({
    count, setCount
});


// Now, the main App.jsx . 

function App() {
    const [count, setCount] = useState(0);

    return (
    <>
    <countContext.Provider value={{count, setCount}}>
    <Count/>
    </countContext.Provider>
    </>
    )
}

function Count({setCount}){
    return <div>
        <CountRenderer/>
        <Button/>
    </div>
}

function CountRenderer(){
    const count = useContext(countContext);
    return <div>{count}</div>
}

function Button(){
    const {count, setCount}= useContext(countContext);
    return <div>
        <button onClick={()=>{
            setCount(count+1)
        }}>Increase</button>

        <button onClick={()=>{
            setCount(count-1)
        }}>Decrease</button>
    </div>
}



