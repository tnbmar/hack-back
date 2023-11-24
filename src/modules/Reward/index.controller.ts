import { Router, Request, Response } from "express";
import rewardService from "../Reward/index.service";
import userService from "../User/index.service";

import checkError from "../../utils/checkError";

export const rewardController = Router();

rewardController.get("/rewards", async (req: Request, res: Response) => {
  // #swagger.tags = ['Rewards']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const rewards = user && (await rewardService.getAllRewards());
    res.status(200).json({ count: rewards?.length, results: rewards });
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
