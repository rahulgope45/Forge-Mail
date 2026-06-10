import { createClient } from "redis";

export const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.on('error',(err)=>{
    console.log('Redis Error:',err)
});

export  async function connectRedis():Promise<boolean> {
    try {
    await redisClient.connect();
    console.log("Redis connected");
    return true;
  } catch (err) {
    console.log("Redis Error:", err);
    return false;
  }
}