import { Router } from "express";
import answerService from "./index.service.js";
import userService from "../User/index.service.js";

import checkError from "../../utils/checkError.js";

export const answerController = Router();

answerController.get("/answers/:taskId", async (req, res) => {
  // #swagger.tags = ['Answers']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const answers = user && (await answerService.getAnswersByTasks(+req.params.taskId));
    res.status(200).json(answers);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

answerController.get("/answers/:id", async (req, res) => {
  // #swagger.tags = ['Answers']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const answer = user && (await answerService.getAnswersById(+req.params.id));
    res.status(200).json(answer);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

answerController.delete("/answers/:id", async (req, res) => {
  // #swagger.tags = ['Answers']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const answer = user && (await answerService.deleteAnswer(+req.params.id));
    res.status(200).json(answer);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

answerController.patch("/answers/:id", async (req, res) => {
  // #swagger.tags = ['Answers']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const answer =
      user &&
      (await answerService.updateAnswer(
        +req.params.id,
        req.body.content,
        req.body.is_true
      ));
    res.status(200).json(answer);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

answerController.post("/answers", async (req, res) => {
  // #swagger.tags = ['Answers']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $content: 'Test',
                    $taskId: 1,
                    $is_true:false


                }
        } */
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const answer = user && (await answerService.createAnswer(req.body));
    res.status(200).json(answer);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
