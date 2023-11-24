import { Router, Request, Response } from "express";
import walletService from "../Wallet/index.service";
import userService from "../User/index.service";

import checkError from "../../utils/checkError";

export const walletController = Router();

walletController.get("/wallet", async (req: Request, res: Response) => {
  // #swagger.tags = ['Wallet']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const wallet = user && (await walletService.getWalletAddress());
    res.status(200).json(wallet);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

walletController.patch("/wallet", async (req: Request, res: Response) => {
  // #swagger.tags = ['Wallet']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const wallet = user && (await walletService.updateWalletAddress(req.body.address));
    res.status(200).json(wallet);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
