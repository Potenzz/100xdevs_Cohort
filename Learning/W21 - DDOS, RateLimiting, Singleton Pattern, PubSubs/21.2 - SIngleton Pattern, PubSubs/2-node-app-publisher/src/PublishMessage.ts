import { createClient, RedisClientType } from "redis";

export class StockPublisher {
    private static instance: StockPublisher;
    private redisClient: RedisClientType;

    // Private constructor to enforce Singleton pattern
    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
    }

    // Get the Singleton instance
    public static getInstance(): StockPublisher {
        if (!StockPublisher.instance) {
            StockPublisher.instance = new StockPublisher();
        }
        return StockPublisher.instance;
    }

    // Publish stock updates
    public async publishStockUpdate(stock: string, price: number): Promise<void> {
        await this.redisClient.publish(stock, `Price update: ${price}`);
        console.log(`Published update for ${stock}: $${price}`);
    }

    // Gracefully disconnect Redis
    public async disconnect(): Promise<void> {
        await this.redisClient.quit();
        console.log("Publisher disconnected from Redis.");
    }
}


const publisher = StockPublisher.getInstance();

// Simulate stock price updates every 5 seconds
setInterval(() => {
    const stock = "AAPL"; // Example stock
    const price = (Math.random() * 1000).toFixed(2); // Random price
    publisher.publishStockUpdate(stock, parseFloat(price));
}, 5000);
