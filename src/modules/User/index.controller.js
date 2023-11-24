import { Router } from "express";
import userService from "./index.service.js";
import checkError from "../../utils/checkError.js";

export const userController = Router();

userController.get("/user/me", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

userController.get("/users", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const allUsers = await userService.getAllUsers();
    if (allUsers) {
      res.status(200).json({ count: allUsers?.length, results: allUsers });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

userController.delete("/users", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const user = await userService.deleteUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

userController.patch("/users-role/:id", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const user = await userService.changeRole(+req.params.id, req.body.role);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});
