
// The ContextAPI main focus is on to get rid of propdrilling, not to make re-rendering more efficient. 
// Instead, the ContextAPI re-renders those component as well, which does not use contextAPI variable, 
// Hence, use ContextAPI accordingly to it. 


// Recoil -  It is a state management library for React that enables efficient, flexible state sharing among 
// components using atoms (units of state) and selectors (derived state). It simplifies state management by 
// integrating seamlessly with React’s hooks, promoting fine-grained updates without unnecessary re-renders.

// its functions: 
// RecoilRoot - Function which use Recoil State shoul be wrapped inside this root.
// atom - can be understood as a variable.
// useRecoilState - gives value and setValue.
// useRecoilValue - gives only value, 
// useSetrecoilState - gives only setValue
// selector - Written below nicely.

// usecase:
// Create folder named store, then atoms, then file-name.jsx --- Conventional way, else just create file-name.jsx
// in count.jsx file:

import { atom, useRecoilValue } from "recoil";

export const countAtom = atom({
    key:"countAtom",
    default:0
});

// In App.jsx

function App() {
    return (
    <>
    <RecoilRoot>
        <Count/>
    </RecoilRoot>
    </>
    )
}

function Count(){
    return <div>
        <CountRenderer/>
        <Button/>
    </div>
}

function CountRenderer(){
    const count = useRecoilValue(countAtom);
    return <div>{count}</div>
}

function Button(){
    const [count, setCount] = useRecoilState(countAtom);
    return <div>
        <button onClick={()=>{
            setCount(count+1)
        }}>Increase</button>

        <button onClick={()=>{
            setCount(count-1)
        }}>Decrease</button>
    </div>
}

// But, here the button fucn re-renders because of two issues at this moment, 
function Button(){
    const setCount = useSetRecoilState(countAtom);
    return <div>
        <button onClick={()=>{
            setCount(count => count+1) // this is just syntax, like the below one.
        }}>Increase</button>

        <button onClick={()=>{
            setCount(function(count){ // like this one.
                return count - 1
            })
        }}>Decrease</button>
    </div>
}




// ----------- Selectors -----------

// A selector represents a piece of derived state. You can think of derived state as the output of passing state to a 
// pure function that derives a new value from the said state.

// In count.jsx file:

import { atom, selector } from "recoil";

export const countAtom2 = atom({
    key:"countAtom",
    default:0
});


export const evenSelector = selector({
    key:"evenSelector",
    get:({get})=>{
        const count = get(countAtom2);
        return count % 2;
    }
});

// So, in App.jsx, Instead of this code:
function ShowEven(){
    const count = useRecoilValue(countAtom);
    const isEven = count%2==0
    return <div> 
        {isEven ? <div>This is Even </div> : null}
        </div>
}


// we can use , 
function ShowEven(){
    const isEven = useRecoilValue(evenSelector)
    return <div> 
        {isEven ? <div>This is Even </div> : null}
        </div>
}
