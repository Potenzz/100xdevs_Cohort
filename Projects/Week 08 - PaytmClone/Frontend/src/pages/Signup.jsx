import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import {
  firstNameAtom,
  lastNameAtom,
  usernameAtom,
  passwordAtom,
} from "../store/atoms/users_atoms"; 
import { errorMessageAtom } from "../store/atoms/error_atoms"; 



export const Signup = () => {

    const [first_name, setFirstName] = useRecoilState(firstNameAtom);
    const [last_name, setLastName] = useRecoilState(lastNameAtom);
    const [username, setUsername] = useRecoilState(usernameAtom);
    const [password, setPassword] = useRecoilState(passwordAtom);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageAtom); 


    const handleSignup = async (e) => {
      setErrorMessage("");  
      e.preventDefault(); 

  
      try {
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
          username,
          first_name,
          last_name,
          password
        });


        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")

      } catch (error) {
        if (error.response) {
            // Handle validation errors
            if (error.response.status === 411) {
                const validationErrors = error.response.data.errors;
                // Format the error messages for display
                const formattedErrors = validationErrors.map(err => `${err.path[0]}: ${err.message}`).join(", ");
                setErrorMessage(formattedErrors);
            } else {
                setErrorMessage(error.response.data.msg || "An error occurred. Please try again.");
            }
        } else {
            setErrorMessage("No response from server. Please check your network connection.");
        }
    }
    };

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="vishnuhere" label={"Username"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="abc123@8" label={"Password"} />
        <div className="pt-4">
          <Button onClick={handleSignup} label={"Sign up"} />
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>} {/* Display error message */}
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}