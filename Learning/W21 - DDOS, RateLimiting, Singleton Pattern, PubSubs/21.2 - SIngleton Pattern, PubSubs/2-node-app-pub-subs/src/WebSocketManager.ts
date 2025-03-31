import { WebSocketServer } from "ws";
import { PubSubManager } from "./PubSubManager";

export class WebSocketManager {
  private static instance: WebSocketManager;
  private wss: WebSocketServer;

  private constructor() {
    this.wss = new WebSocketServer({ port: 8080 });
    console.log("WebSocket server started on port 8080");

    this.wss.on("connection", (ws) => {
      console.log("Client connected to WebSocket");

      ws.on("message", (message) => {
        console.log(`Received: ${message}`);
      });
    });

    PubSubManager.getInstance().registerWebSocketServer(this.wss);
  }

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  public broadcastMessage(stock: string, message: string) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ stock, message }));
      }
    });
  }
}
