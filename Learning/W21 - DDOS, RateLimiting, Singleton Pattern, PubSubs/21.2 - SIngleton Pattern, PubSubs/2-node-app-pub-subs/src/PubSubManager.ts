import { createClient, RedisClientType } from "redis";
import { WebSocketManager } from "./WebSocketManager";
import { WebSocketServer } from "ws";

export class PubSubManager {
  private static instance: PubSubManager;
  private redisClient: RedisClientType;
  private subscriptions: Map<string, string[]>;

  //private constructor to prevent direct construction call
  private constructor() {
    this.redisClient = createClient();
    this.redisClient.on("error", (err) => {
      console.error("Redis Connection Error:", err);
    });

    this.redisClient
      .connect()
      .then(() => console.log("Connected to Redis!"))
      .catch((err) => console.error("Redis Connection Failed:", err));

    this.subscriptions = new Map();
  }

  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
  }

  public userSubscribe(userId: string, stock: string) {
    console.log(`User ${userId} subscribing to ${stock}`);

    if (!this.subscriptions.has(stock)) {
      this.subscriptions.set(stock, []);
    }

    this.subscriptions.get(stock)?.push(userId);

    if (this.subscriptions.get(stock)?.length === 1) {
      console.log(`Subscribing to Redis channel: ${stock}`);

      this.redisClient
        .subscribe(stock, (message) => {
          console.log(`🔔 Received message from Redis on ${stock}: ${message}`);
          this.handleMessage(stock, message);
        })
        .catch((err) => console.error("❌ Redis Subscription Error:", err));
    }
  }

  public userUnSubscribe(userId: string, stock: string) {
    if (this.subscriptions.has(stock)) {
      const subscribers = this.subscriptions.get(stock);
      if (subscribers) {
        const index = subscribers.indexOf(userId);
        if (index !== -1) {
          subscribers.splice(index, 1);
          console.log(`User ${userId} unsubscribed from ${stock}`);
        }
        if (subscribers.length === 0) {
          this.subscriptions.delete(stock);
          this.redisClient.unsubscribe(stock);
          console.log(`Unsubscribed from Redis channel: ${stock}`);
        }
      }
    }
  }

  private handleMessage(stock: string, message: string) {
    console.log(`Message received on channel ${stock}: ${message}`);

    this.subscriptions.get(stock)?.forEach((sub) => {
      console.log(`Sending message to user: ${sub}`);
    });

    WebSocketManager.getInstance().broadcastMessage(stock, message);
  }

  public async disconnect() {
    await this.redisClient.quit();
  }

  public registerWebSocketServer(server: WebSocketServer) {
    console.log("WebSocket server registered.");
  }
}
