import { createClient, RedisClientType } from "redis";

class RedisService {
    private client: RedisClientType | null = null;

    async connect() {
        if (this.client?.isOpen) {
            return this.client;
        }

        this.client = createClient({
            username: 'default',
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_URL,
                port: parseInt(process.env.REDIS_PORT as string)
            }
        });

        this.client.on("error", (err) => console.error("Redis Client Error", err));
        await this.client.connect();
        console.log("Connected to Redis");
        return this.client;
    }

    getClient(): RedisClientType {
        if (!this.client?.isOpen) {
            throw new Error("Redis is not connected");
        }

        return this.client;
    }

    async disconnect() {
        if (this.client?.isOpen) {
            await this.client.quit();
            console.log("Disconnected from Redis");
        }
    }
}

export default new RedisService();