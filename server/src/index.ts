import dotenv from 'dotenv';
dotenv.config()
import express, { type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import {prisma,testDatabaseConnection} from './lib/prisma.js'
import authRoutes from './routes/auth.routes.js'
const PORT = 3000;
const app = express();
app.use(express.json())
app.use(cookieParser())


app.get('/',(req:Request,res:Response)=>{
    res.json({msg:"Server startup"})
});

//Routes
app.use('/api/auth',authRoutes)



const startServer = async ()=>{
 console.log("Checking All The Apis");


 //======= Database Conection =======
 const isDataBaseConnectionOk = await testDatabaseConnection()
 if(!isDataBaseConnectionOk){
    console.log("Error is Database Connection")
 }

 app.listen(PORT,()=>{
    console.log(`Server Started at:${PORT}`)
})
}

startServer()

