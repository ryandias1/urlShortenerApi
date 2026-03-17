import { createClient } from 'redis';
import "dotenv/config"

const redisUrl = process.env.REDIS_URL

const redisClient = createClient({
    url: redisUrl
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

export { redisClient };