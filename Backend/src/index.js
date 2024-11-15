import { app } from "./app.js";

import connectDB from "./database/db.js";


connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!",err)
})