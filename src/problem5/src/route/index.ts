import { Application } from "express";
import userRouter from "../api/user";

function route(app: Application) {
  app.use("/users", userRouter);
}

export default route;
