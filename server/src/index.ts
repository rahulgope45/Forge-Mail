import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import {prisma,testDatabaseConnection} from './lib/prisma.js'
import authRoutes from './routes/auth.routes.js'
import { connectRedis } from './config/redis.js';
import { testMailerConnection } from './lib/mailer.js';
import testClient from './routes/test.route.js';

const PORT = 3000;
const app = express();
app.use(express.json())
app.use(cookieParser())

app.get('/',(req:Request,res:Response)=>{
    res.json({msg:"Server startup"})
});

//Routes
app.use('/api/auth',authRoutes)

//Test to check Gmail Client is making or not
app.use('/api',testClient)

const startServer = async ()=>{
 console.log("Checking All The Apis");


 //======= Database Conection =======
 const isDataBaseConnectionOk = await testDatabaseConnection()
 if(!isDataBaseConnectionOk){
    console.log("Error is Database Connection")
 }

 //======== Redis connection ===========
 const isRedisConnected = await connectRedis();
 if(!isRedisConnected){
    console.log("Error in Redis Connection")
 }

 // ======== User returning Mailer ====
 const isMailerOk = testMailerConnection();
 if(!isMailerOk){
    console.log("Error in Redis Connection")
 };

 app.listen(PORT,()=>{
    console.log(`Server Started at:${PORT}`)
})
}

startServer()

