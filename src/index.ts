import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import usersRouter from "@/routers/users.router";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors());

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json("Home Page");
});

app.get("/test", (req, res) => {
  res.json("This Is A Test Page");
});

mongoose.connect(process.env.DATABASE_URL!).then(() => {
  app.listen(port, () => console.log(`Server listening on port: ${port}`));
});
