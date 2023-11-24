import { Router } from "express";
import subjectService from "./index.service.js";
import userService from "../User/index.service.js";

import checkError from "../../utils/checkError.js";

export const subjectController = Router();

subjectController.get("/subjects", async (req, res) => {
  // #swagger.tags = ['Subjects']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const subjects = user && (await subjectService.getAllSubjects());
    res.status(200).json({ count: subjects?.length, results: subjects });
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

subjectController.get("/subjects/:id", async (req, res) => {
  // #swagger.tags = ['Subjects']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const subject = user && (await subjectService.getSubjectById(+req.params.id));
    res.status(200).json(subject);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

subjectController.delete("/subjects/:id", async (req, res) => {
  // #swagger.tags = ['Subjects']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const subject = user && (await subjectService.deleteSubject(+req.params.id));
    res.status(200).json(subject);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

subjectController.patch("/subjects/:id", async (req, res) => {
  // #swagger.tags = ['Subjects']
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const subject =
      user && (await subjectService.updateSubject(+req.params.id, req.body.name));
    res.status(200).json(subject);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});

subjectController.post("/subjects", async (req, res) => {
  // #swagger.tags = ['Subjects']
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: '',
                schema: {
                    $name: 'Test',

                }
        } */
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token field empty");
    const user = await userService.getUserByToken(token);
    const subject = user && (await subjectService.createSubject(req.body));
    res.status(200).json(subject);
  } catch (error) {
    const errorStatus = checkError(error);
    res.status(errorStatus.status).json(errorStatus.message);
  }
});
