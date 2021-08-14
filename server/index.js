import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import getRoutes from "./Routers/getRoutes.js";
import getUsers from "./Routers/getUsers.js";
import dotenv from "dotenv";
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//---------------------------------------------------------------------------
dotenv.config();
mongoose
  .connect(process.env.db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.port, () =>
      console.log(`Server running on port : ${process.env.port}`)
    )
  )
  .catch((err) => console.log(err.message));
mongoose.set("useFindAndModify", false);
//-----------------------------------------------------------------------------------
app.use("/posts", getRoutes);
app.use("/users/", getUsers);
