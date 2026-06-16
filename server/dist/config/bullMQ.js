const redisURL = new URL(process.env.REDIS_URL || 'redis://redis:6379');
export const redisConnection = {
    host: redisURL.hostname,
    port: redisURL.port,
    password: redisURL.password || undefined,
    tls: redisURL.protocol === 'rediss:' ? {} : undefined
};
//# sourceMappingURL=bullMQ.js.map