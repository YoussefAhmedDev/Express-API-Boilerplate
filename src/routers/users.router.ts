import { Router } from "express";

import {
  createUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
} from "@/controllers/user.controller";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.post("/", createUser);
usersRouter.get("/:id", getUser);
usersRouter.patch("/:id", editUser);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
