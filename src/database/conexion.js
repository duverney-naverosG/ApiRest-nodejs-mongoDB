import mongoose from "mongoose";
import { config } from "dotenv";
config();


const main = async() =>{
    try {
        const db = await mongoose.connect(process.env.URI_MONGO) 
        console.log("DB conectada : ", db.connection.name);
    } catch (error) {
        console.log(error);
    }
}

main()