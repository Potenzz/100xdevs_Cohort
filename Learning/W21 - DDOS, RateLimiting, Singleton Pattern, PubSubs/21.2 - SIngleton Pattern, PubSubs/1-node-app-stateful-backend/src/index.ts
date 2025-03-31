import { StartLogger } from "./logger";
import { gameManager } from "./store";

StartLogger();

setInterval(()=>{
    gameManager.addGame(
        Math.random().toString(),
        "first",
        "second",
    )
}, 5000)