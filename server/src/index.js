import dotenv from "dotenv"
import connectDB from "./db"

dotenv.config({
    path:"./env"
})

connectDB()