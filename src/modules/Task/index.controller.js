import { Router } from "express";
import taskService from "./index.service.js";
import userService from "../User/index.service.js";
import checkError from "../../utils/checkError.js";

export const taskController = Router();

taskController.get("/tasks-on-lesson/:lessonId", async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const tasks = user && (await taskService.getTasksByLessons(+req.params.lessonId));
    res.status(200).json(tasks);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.get("/tasks/:id", async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const task = user && (await taskService.getTaskById(+req.params.id));
    res.status(200).json(task);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.delete("/tasks/:id", async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const task = user && (await taskService.deleteTask(+req.params.id));
    res.status(200).json(task);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.patch("/tasks/:id", async (req, res) => {
  // #swagger.tags = ['Tasks']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const task = user && (await taskService.updateTask(+req.params.id, req.body.content));
    res.status(200).json(task);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.post("/tasks", async (req, res) => {
  // #swagger.tags = ['Tasks']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $content: 'Test',
                    $lessonId: 1,


                }
        } */
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const task = user && (await taskService.createTask(req.body));
    res.status(200).json(task);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

taskController.post("/check-answer", async (req, res) => {
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
    const task = user && (await taskService.checkTask(req.body, user));
    res.status(200).json(task);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
