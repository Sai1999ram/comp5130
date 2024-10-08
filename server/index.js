import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8800;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Database is connected successfully.");
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    })
    .catch((error)=>console.log(error));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const UserModel = mongoose.model("student" , userSchema)

app.get("", async(req, res)=>{
    res.status(200).json({
        status:true ,
        message:"Welcome to the app"
    });
    
});