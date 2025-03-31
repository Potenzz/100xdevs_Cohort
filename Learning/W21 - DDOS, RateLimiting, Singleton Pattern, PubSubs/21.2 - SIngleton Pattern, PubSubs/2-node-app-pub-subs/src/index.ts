import { PubSubManager } from "./PubSubManager";

console.log("Starting PubSub System...");

import { WebSocketManager } from "./WebSocketManager"; // Import WebSocketManager

WebSocketManager.getInstance();

setInterval(()=>{
    console.log("Subscribing to RandomStock...");

    PubSubManager.getInstance().userSubscribe(Math.random().toString(), "RandomStock")
}, 20000)
