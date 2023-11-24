import { Request, Response } from "express";
import userService from "../User/index.service";

import { decodeToken } from "../../utils/decodeToken";
import { User } from "@prisma/client";
import { validateTokenDto } from "./dto/validate-token.dto";

class AuthService {
  public async registration(req: Request, res: Response) {
    try {
      const user = await userService.getUserByUsernameAndPassword(
        req.body.username,
        req.body.password
      );

      if (user) {
        const token = decodeToken(user.id);
        return res.status(200).json({ token, user });
      }

      const newUser = await userService.createUser(req.body);

      if (newUser) {
        const token = decodeToken(newUser.id);

        return res.status(200).json({ token, user: newUser });
      } else {
        return res.status(400).json("Error in database");
      }
    } catch (error) {
      return res.status(500);
    }
  }

  public async authentification(req: Request, res: Response) {
    try {
      const user = await userService.getUserByUsernameAndPassword(
        req.body.username,
        req.body.password
      );

      if (user) {
        const token = decodeToken(user.id);
        return res.status(200).json({ token, user });
      } else {
        return res.status(403).json("User not found");
      }
    } catch (error) {
      return res.status(500);
    }
  }

  public async authentificationForAdmin(req: Request, res: Response) {
    try {
      if (req.body.role === "admin") {
        const user = await userService.getUserByUsernameAndPassword(
          req.body.username,
          req.body.password
        );

        if (user) {
          const token = decodeToken(user.id);
          return res.status(200).json({ token, user });
        } else {
          return res.status(403).json("User not found");
        }
      } else {
        return res.status(403).json("Not admin");
      }
    } catch (error) {
      return res.status(500);
    }
  }

  public async validateToken(req: validateTokenDto, res: Response, user: User) {
    try {
      if (req.username === user.username) {
        return res.status(200).json("Accept");
      } else {
        throw new Error("This is Another user");
      }
    } catch (e: any) {
      res.status(403).json(e.message);
    }
  }
}

export default new AuthService();
