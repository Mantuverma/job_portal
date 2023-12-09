import dotenv from "dotenv"
import connectDB from "./db/db.connection.js";
import { DB_NAME } from "./utils/constant.js";
import { app } from "./app.js";
dotenv.config({
    path: './.env'
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(` Server is running at port : ${process.env.PORT} with ${DB_NAME}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
