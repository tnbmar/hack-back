import { Router } from "express";
import lessonService from "./index.service.js";
import userService from "../User/index.service.js";
import checkError from "../../utils/checkError.js";

export const lessonController = Router();

lessonController.get("/lessons-on-module/:moduleId", async (req, res) => {
  // #swagger.tags = ['Lessons']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const lessons =
      user && (await lessonService.getLessonsByModule(+req.params.moduleId));
    res.status(200).json(lessons);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

lessonController.get("/lessons/:id", async (req, res) => {
  // #swagger.tags = ['Lessons']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const lesson = user && (await lessonService.getLessonById(+req.params.id));
    res.status(200).json(lesson);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

lessonController.delete("/lessons/:id", async (req, res) => {
  // #swagger.tags = ['Lessons']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const lesson = user && (await lessonService.deleteLesson(+req.params.id));
    res.status(200).json(lesson);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

lessonController.patch("/lessons/:id", async (req, res) => {
  // #swagger.tags = ['Lessons']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const lesson =
      user && (await lessonService.updateLesson(+req.params.id, req.body.name));
    res.status(200).json(lesson);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

lessonController.post("/lessons", async (req, res) => {
  // #swagger.tags = ['Lessons']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $name: 'Test',
                    $moduleId: 1,


                }
        } */
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const lesson = user && (await lessonService.createLesson(req.body));
    res.status(200).json(lesson);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
