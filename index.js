import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authrouter from "./route/authroute.js";
import protectedrouter from "./route/authroute.js"
// import userrouter from "./route/userroute.js"
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authrouter);
app.use("/api",protectedrouter)

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("error" + err);
  });
