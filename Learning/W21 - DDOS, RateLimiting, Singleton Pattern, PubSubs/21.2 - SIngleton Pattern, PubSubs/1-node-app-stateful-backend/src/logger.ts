import { gameManager } from "./store";

export function StartLogger() {
  setInterval(() => {
    console.log(gameManager);
  }, 5000);
}
