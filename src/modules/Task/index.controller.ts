import { Router, Request, Response } from "express";
import taskService from "../Task/index.service";
import userService from "../User/index.service";

import checkError from "../../utils/checkError";

export const taskController = Router();

taskController.get("/tasks/:lessonId", async (req: Request, res: Response) => {
  // #swagger.tags = ['Tasks']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const tasks = user && (await taskService.getTasksByLessons(+req.params.lessonId));
    res.status(200).json(tasks);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.get("/tasks/:id", async (req: Request, res: Response) => {
  // #swagger.tags = ['Tasks']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const task = user && (await taskService.getTaskById(+req.params.id));
    res.status(200).json(task);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.delete("/tasks/:id", async (req: Request, res: Response) => {
  // #swagger.tags = ['Tasks']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const task = user && (await taskService.deleteTask(+req.params.id));
    res.status(200).json(task);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.patch("/tasks/:id", async (req: Request, res: Response) => {
  // #swagger.tags = ['Tasks']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const task = user && (await taskService.updateTask(+req.params.id, req.body.content));
    res.status(200).json(task);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.post("/tasks", async (req: Request, res: Response) => {
  // #swagger.tags = ['Tasks']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $name: 'Test',
                    $lessonId: 1,
                    $currentAnswerId:1,


                }
        } */
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const task = user && (await taskService.createTask(req.body));
    res.status(200).json(task);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.post("/check-answer", async (req: Request, res: Response) => {
  // #swagger.tags = ['Tasks']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $task_id: 1,
                    $answer_id: 1,


                }
        } */
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const task = user && (await taskService.checkTask(req.body));
    res.status(200).json(task);
  } catch (error: any) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
