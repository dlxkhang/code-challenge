import express from 'express'
import userController from "./user.controller";
import { validateBody } from "../../middlewares/validation.middleware";
import { CreateUserDTO, UpdateUserDTO } from "./dto";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.post("/", validateBody(CreateUserDTO), userController.createUser);

router.put("/:id", validateBody(UpdateUserDTO), userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
