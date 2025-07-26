import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'
import { connectDB } from './config/db.js';

//app config
const app = express()
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors())

connectDB();
// api endpoints
app.use('/api/user',userRouter )
app.use('/api/',productRouter)


app.get("/",(req,res)=>{
        res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
