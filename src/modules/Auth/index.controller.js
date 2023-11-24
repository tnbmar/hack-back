import { Router } from "express";
import authService from "./index.service.js";

export const authController = Router();

authController.post(
  "/registration",
  // #swagger.tags = ['Registration']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $username: 'Test',
                    $password: 'test',
                    $email: 'test@mail.ru',

                }
        } */
  async (req, res) => {
    try {
      return authService.registration(req, res);
    } catch (error) {
      res.status(400).json({ error: "Ошибка при получении пользователей." });
    }
  }
);

authController.post(
  "/auth",
  // #swagger.tags = ['Auth']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $username: 'Test',
                    $password: 'test',

                }
        } */
  async (req, res) => {
    try {
      return authService.authentification(req, res);
    } catch (error) {
      res.status(400).json({ error: "Ошибка при получении пользователей." });
    }
  }
);

authController.post(
  "/auth-admin",
  // #swagger.tags = ['Auth']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $username: 'Test',
                    $password: 'test',

                }
        } */
  async (req, res) => {
    try {
      return authService.authentificationForAdmin(req, res);
    } catch (error) {
      res.status(400).json({ error: "Ошибка при получении пользователей." });
    }
  }
);
