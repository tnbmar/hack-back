import { Router } from "express";
import rewardService from "./index.service.js";
import userService from "../User/index.service.js";
import checkError from "../../utils/checkError.js";

export const rewardController = Router();

rewardController.get("/rewards", async (req, res) => {
  // #swagger.tags = ['Rewards']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const rewards = user && (await rewardService.getAllRewards());
    res.status(200).json({ count: rewards?.length, results: rewards });
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
