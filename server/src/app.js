import express from 'express';
import cors from 'cors';    
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middlewares.js';
import morgan from "morgan"

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)


app.use(morgan("dev"))

app.use(errorHandler)
export {app}