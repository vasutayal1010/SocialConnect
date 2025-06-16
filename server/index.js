import { app,server } from "./socket/socket.js";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import express,{urlencoded} from 'express'


dotenv.config();
const PORT = 8000;


app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};
app.use(cors(corsOptions));

server.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
