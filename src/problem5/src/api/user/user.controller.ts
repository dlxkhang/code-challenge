import { Request, Response } from "express";
import userService from "./user.service";
import { CustomError, handleError } from "../../common/error.handler";

class UserController {
  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);
      res.json({
        data: user,
      });
    } catch (error) {
      handleError(res, error as CustomError);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const { name } = req.query;

      const users = await userService.getAllUsers(name as string);
      res.json({
        data: users,
      });
    } catch (error) {
      console.log("error: ", error);
      handleError(res, error as CustomError);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        data: user,
      });
    } catch (error) {
      handleError(res, error as CustomError);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({
        data: user,
      });
    } catch (error) {
      handleError(res, error as CustomError);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.json({
        data: result,
      });
    } catch (error) {
      handleError(res, error as CustomError);
    }
  }
}

export default new UserController();
