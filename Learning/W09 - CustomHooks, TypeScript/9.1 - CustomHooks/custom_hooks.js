// Hooks - Hooks are special functions that allow developers to use React features, such as state and lifecycle methods, 
// within functional components. Introduced in React 16.8, hooks simplify and enhance component functionality, making 
// functional components more powerful and comparable to class components in terms of capabilities.

// In my words, we can use hooks to use features like use state and side effects in simple functional components.



// lifecycle Events are events when components are mounted and unmounted. 
// So we can run any code when such events happens. 

// Below code, tells about how the returning thing is required, in hooks, known as Cleanup Function.

// The hook first will just log "comp mounted", 
// When it will gets UnMounted it will return the thing from that hook, in this case it will log "comp unmonted"

// This code, mount and unmount comp within few intervals. 

// When the State Variable changes, the react renders the component, or can be said it runs the code again with 
// fresh variables, but the useEffect won't run again because it runs only once and run only when its
// dependency gets changed, just a information.

// Code : 

function App() {
  const [render, setRender] = useState(true);

  useEffect(()=>{
    setInterval(()=>{
      setRender(r => !r );
    },5000)
  },[]);

  return <div>
    {render ? <MyComponent/> : <div/>}
  </div>

}

function MyComponent(){
  useEffect(()=>{
    console.error("Component Mounted");

    return () => {
      console.log("Component UnMounted");
    };
  },[])

  return <div>My component</div>

}



// As we said earlier, Hooks were introduced as functional components, 
// Previously, it used to be done as Class Component like, see below:

class MyComponent extends React.Component {
  componentDidMount(){
    console.log("Component mounted")
  }

  componentWillUnmount(){
    console.log("Componet umMounted")
  }

  render(){
    return <div>Hi there.</div>
  }
}



//---------------- Custom hooks -------------------

// 1. should start with use. 
// 2. should use interal hook, i.e. useEffect, useState.


// --------------- adhoc
// SWR - react hook for data fetching. 
// window.navigator.online() - this returns true if online,

