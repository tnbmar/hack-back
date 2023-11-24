import { Router } from "express";
import moduleService from "./index.service.js";
import userService from "../User/index.service.js";
import checkError from "../../utils/checkError.js";

export const moduleController = Router();

moduleController.get("/modules-on-subject/:subjectId", async (req, res) => {
  // #swagger.tags = ['Modules']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const modules =
      user && (await moduleService.getModulesBySubject(+req.params.subjectId));
    res.status(200).json(modules);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

moduleController.get("/modules/:id", async (req, res) => {
  // #swagger.tags = ['Modules']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const module = user && (await moduleService.getModuleById(+req.params.id));
    res.status(200).json(module);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

moduleController.delete("/modules/:id", async (req, res) => {
  // #swagger.tags = ['Modules']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const module = user && (await moduleService.deleteModule(+req.params.id));
    res.status(200).json(module);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

moduleController.patch("/modules/:id", async (req, res) => {
  // #swagger.tags = ['Modules']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const module =
      user && (await moduleService.updateModule(+req.params.id, req.body.name));
    res.status(200).json(module);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

moduleController.post("/modules", async (req, res) => {
  // #swagger.tags = ['Modules']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $name: 'Test',
                    $subjectId: 1,


                }
        } */
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const module = user && (await moduleService.createModule(req.body));
    res.status(200).json(module);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
