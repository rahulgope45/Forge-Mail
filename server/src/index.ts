import dotenv from 'dotenv';
dotenv.config()
import express, { type Request, type Response } from 'express';

const PORT = 3000;
const app = express();
app.use(express.json())


app.get('/',(req:Request,res:Response)=>{
    res.json({msg:"Server startup"})
});

app.listen(PORT,()=>{
    console.log(`Server Started at:${PORT}`)
})

