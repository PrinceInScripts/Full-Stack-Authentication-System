import mongoose from 'mongoose';
import { DB_NANE } from '../constant';

mongoose.set("strictQuery",false)

const connectDB = async () => {
    try {
        const {connection}=await mongoose.connect(process.env.MONGODB_URL,{
            dbName:DB_NANE,
        })
    
        if(connection){
            console.log(`Connection to mongodb ${connection.host}`);
        }
    } catch (error) {
        console.log("Error connection on database",error);
        process.exit(1);
    }
}

export default connectDB;