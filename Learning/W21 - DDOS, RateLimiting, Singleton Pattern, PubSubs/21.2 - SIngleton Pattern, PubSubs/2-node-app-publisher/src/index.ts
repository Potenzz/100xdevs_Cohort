import { PubSubManager } from "./PubSubManager";

setInterval(()=>{
    PubSubManager.getInstance().userSubscribe(Math.random().toString(), "RandomStock")
}, 5000)