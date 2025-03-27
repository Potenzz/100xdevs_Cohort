import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { Turnstile } from '@marsidev/react-turnstile'
console.log("Cloudflare Site Key:", import.meta.env.VITE_CLOUDFLARE_SITEKEY);

function App() {
  const [token, setToken] = useState<string>("");

  return (
    <>
      <input placeholder='OTP'></input>
      <input placeholder='New Password' />

      <Turnstile onSuccess={(token)=>{
        setToken(token)
      }} siteKey={import.meta.env.VITE_CLOUDFLARE_SITEKEY}/>

      <button onClick={()=>{
        axios.post("http://localhost:3000/reset-password", {
          email:"test@gmail.com",
          otp:"123455",
          token:token
        })
      }}>Send Password</button>
    </>
  )
}

export default App
