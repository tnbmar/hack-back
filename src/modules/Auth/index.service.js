import userService from "../User/index.service.js";
import { decodeToken } from "../../utils/decodeToken.js";

class AuthService {
  async registration(req, res) {
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

  async authentification(req, res) {
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

  async validateToken(req, res, user) {
    try {
      if (req.username === user.username) {
        return res.status(200).json("Accept");
      } else {
        throw new Error("This is Another user");
      }
    } catch (e) {
      res.status(403).json(e.message);
    }
  }
}

export default new AuthService();
