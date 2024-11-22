import { app } from "./app.js";
import http from "http";
import { initializeSignaling } from "./utils/socket.js";
import connectDB from "./database/db.js";

const server = http.createServer(app);

// Initialize WebRTC signaling
initializeSignaling(server);

connectDB()
.then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!",err)
})