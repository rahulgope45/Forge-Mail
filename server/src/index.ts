import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import express, { type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import { prisma, testDatabaseConnection } from './lib/prisma.js'
import authRoutes from './routes/auth.routes.js'
import mailSendRoutes from './routes/mailSender/mailSend.route.js';
import { connectRedis } from './config/redis.js';
import { testMailerConnection } from './lib/mailer.js';
import testClient from './routes/test.route.js';
import { mailSendWorker } from './worker/Mailsend.worker.js';
import worker from './worker/welcomeMail.worker.js';
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
   res.json({ msg: "Server startup" })
});

// ======== Allowed Origins =====

const allowedOrigins = [
   "http://localhost:3000",
   "http://10.222.154.94:3000"
]

app.use(
   cors({
      origin: allowedOrigins,
      credentials:true
   })
)
// ========= Routes =========

//====== Auth Routes ======
app.use('/api/auth', authRoutes);

// =====Mail Send Routes =====

app.use('/api/mail', mailSendRoutes);

//Test to check Gmail Client is making or not
app.use('/api', testClient)

const startServer = async () => {
   console.log("Checking All The Apis");


   //======= Database Conection =======
   const isDataBaseConnectionOk = await testDatabaseConnection()
   if (!isDataBaseConnectionOk) {
      console.log("Error is Database Connection")
   }

   //======== Redis connection ===========
   const isRedisConnected = await connectRedis();
   if (!isRedisConnected) {
      console.log("Error in Redis Connection")
   }

   // ======== User returning Mailer ====
   const isMailerOk = testMailerConnection();
   if (!isMailerOk) {
      console.log("Error in Redis Connection")
   };

   app.listen(PORT, () => {
      console.log(`Server Started at:${PORT}`)
   })
}

startServer()

