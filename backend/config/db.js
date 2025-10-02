import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://riyarsunny706:rmIHrVRGcTvXBsvV@shrigbikaner.gs4slf2.mongodb.net/food-del').then(()=>console.log("DB Connected"));
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.