import { createClient } from "redis";
const redisConnectionUrl = process.env.REDIS_URL
    || (process.env.REDIS_HOST
        ? `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}`
        : null);
if (!redisConnectionUrl) {
    console.error("CRITICAL: No Redis config found. Exiting.");
    process.exit(1); // now it actually stops and logs
}
export const redisClient = createClient({
    url: redisConnectionUrl
});
redisClient.on('error', (err) => {
    console.log('Redis Error:', err);
});
export async function connectRedis() {
    try {
        await redisClient.connect();
        console.log("Redis connected");
        return true;
    }
    catch (err) {
        console.log("Redis Error:", err);
        return false;
    }
}
//# sourceMappingURL=redis.js.map