import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState< null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [sendMessage, setSendMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to ws");
      setSocket(socket)
    };

    socket.onmessage = (message) => {
      console.log("Received Message: ", message.data)
      setLatestMessage(message.data)
    };

    return () => {
      console.log("Closing WebSocket connection...");
      socket.close();
    };
  }, []);

  if(!socket){
    return <div>
      conencting to socket server...
    </div>
  }

  return <div>
    <input onChange={(e)=>{
      setSendMessage(e.target.value)
    }}></input>

    <button onClick={()=>{
      socket.send(sendMessage);
    }}> Send Message</button>

    <div>{latestMessage}</div>
  </div>
}

export default App;
