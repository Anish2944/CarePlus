import express from "express";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//import routes
import userRouter from "./routes/user.routes.js"
import healthcheckRouter from "./routes/healthcheck.routes.js"


//routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/healthcheck", healthcheckRouter)

//middleware for sending error as json response
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        success: err.success,
        message: err.message,
        errors: err.errors
      });
    }
    console.error(err);
    //for errors which are not defined
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on the server',
      errors: []
    });
  });

export { app }