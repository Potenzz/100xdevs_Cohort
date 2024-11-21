// App.jsx code:

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Appbar } from './Components/Appbar';
import React from 'react';

const Dashboard = React.lazy(() =>  import('./Components/Dashboard'));
const Landing = React.lazy(()=> import('./Components/Landing'));

function App() {
    return (
    <>
    <BrowserRouter>
    <Appbar/>
    <React.Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/' element={<Landing />} />
                    </Routes>
                </React.Suspense>
    </BrowserRouter>
    </>
    )
}

export default App




// -------------------------------
// Appbar.jsx code:



import {useNavigate} from 'react-router-dom';

export function Appbar(){
    // This useNavigate thing can only be callled under BrowserRouter in App.jsx, else it won't work.
    const navigate = useNavigate();
    return <div>
    <button onClick={()=>{navigate('/')}}>Landing Page</button>
    <button onClick={()=>{navigate('/Dashboard')}}>Dashboard Page</button>
</div>
}



// Dashboard and Landing page 

// export default function Dashboard(){
//     // we use default here, as now it will be the only func which can be exported ,, easy to import by other files.
//     return <div> Dashboard Page</div>
// }

// export default function Landing(){
//     return <div>
//     Landing Page
//     </div>
// }