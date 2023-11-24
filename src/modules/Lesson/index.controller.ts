import { Router, Request, Response } from "express";
import lessonService from "../Lesson/index.service";
import userService from "../User/index.service";

import checkError from "../../utils/checkError";

export const lessonController = Router();

lessonController.get("/lessons/:moduleId", async (req: Request, res: Response) => {
  // #swagger.tags = ['Lessons']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const lessons =
      user && (await lessonService.getLessonsByModule(+req.params.moduleId));
    res.status(200).json(lessons);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

lessonController.get("/lessons/:id", async (req: Request, res: Response) => {
  // #swagger.tags = ['Lessons']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const lesson = user && (await lessonService.getLessonById(+req.params.id));
    res.status(200).json(lesson);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

lessonController.delete("/lessons/:id", async (req: Request, res: Response) => {
  // #swagger.tags = ['Lessons']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const lesson = user && (await lessonService.deleteLesson(+req.params.id));
    res.status(200).json(lesson);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

lessonController.patch("/lessons/:id", async (req: Request, res: Response) => {
  // #swagger.tags = ['Lessons']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const lesson =
      user && (await lessonService.updateLesson(+req.params.id, req.body.name));
    res.status(200).json(lesson);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

lessonController.post("/lessons", async (req: Request, res: Response) => {
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
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
