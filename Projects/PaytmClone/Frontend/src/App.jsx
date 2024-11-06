import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import useAuthRedirect from './hooks/useAuthRedirect'; 


function App() {

  const isValid = useAuthRedirect(); 

  if (isValid === null) {
    // You can show a loading spinner or fallback UI while the validation is in progress
    return <div>Loading...</div>;
  }
  return (
    <RecoilRoot>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
    </RecoilRoot>
  );
}

export default App;

