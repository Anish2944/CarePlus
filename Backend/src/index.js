import { app } from "./app.js";
import { loadEnvFile } from 'node:process';
import connectDB from "./database/db.js";

loadEnvFile();

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!",err)
})