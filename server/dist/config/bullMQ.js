import dotenv from 'dotenv';
dotenv.config();
const redisURL = new URL(process.env.REDIS_URL || 'redis://redis:6379');
// console.log("REDIS_URL =", process.env.REDIS_URL);
export const redisConnection = {
    host: redisURL.hostname,
    port: Number(redisURL.port),
    password: redisURL.password || undefined,
    tls: redisURL.protocol === 'rediss:' ? {} : undefined
};
//# sourceMappingURL=bullMQ.js.map