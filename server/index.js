import { app,server } from "./socket/socket.js";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import express,{urlencoded} from 'express';
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js"
import connectDB from "./db/db.js";



dotenv.config();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};
app.use(cors(corsOptions));

//Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

//Server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
