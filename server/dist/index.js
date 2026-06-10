import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
import cookieParser from 'cookie-parser';
import { prisma, testDatabaseConnection } from './lib/prisma.js';
import authRoutes from './routes/auth.routes.js';
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
import { connectRedis } from './config/redis.js';
app.get('/', (req, res) => {
    res.json({ msg: "Server startup" });
});
//Routes
app.use('/api/auth', authRoutes);
const startServer = async () => {
    console.log("Checking All The Apis");
    //======= Database Conection =======
    const isDataBaseConnectionOk = await testDatabaseConnection();
    if (!isDataBaseConnectionOk) {
        console.log("Error is Database Connection");
    }
    //======== Redis connection ===========
    const isRedisConnected = await connectRedis();
    if (!isRedisConnected) {
        console.log("Error in Redis Connection");
    }
    app.listen(PORT, () => {
        console.log(`Server Started at:${PORT}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map