import express from 'express';
import cors from 'cors';    
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middlewares.js';
import morgan from "morgan"
import passport from 'passport';
import session from "express-session"

const app=express();

app.use(cors({
    // origin:'http://localhost:3000',
    origin:process.env.CORS_ORIGIN || process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(express.json({limit:"16kb"}));
app.use(
    session({
      secret: process.env.EXPRESS_SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  ); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"))
//import routes
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users",userRouter)




app.use(errorHandler)
export {app}