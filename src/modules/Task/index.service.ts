import prisma from "../../database";
import { checkTaskDto, taskDto } from "./dto/task.dto";

class TaskService {
  async getTaskById(id: number) {
    try {
      const task = await prisma.task.findFirst({
        where: { id },
        include: { answers: true },
      });
      if (!task) throw new Error("Вопрос не найден");
      return task;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getTasksByLessons(id: number) {
    try {
      const tasks = await prisma.task.findMany({
        where: { lesson_id: id },
        include: { answers: true },
      });
      if (!tasks) throw new Error("Вопросы не найден");
      return tasks;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateTask(id: number, content: string) {
    try {
      const task = await prisma.task.update({ where: { id: id }, data: { content } });
      return task;
    } catch (e) {
      console.error({ e });
    }
  }

  async deleteTask(id: number) {
    try {
      await prisma.task.delete({ where: { id } });
    } catch (e) {
      console.error({ e });
    }
  }

  async createTask(task: taskDto) {
    try {
      const newTask = await prisma.task.create({
        data: {
          content: task.content,
          lesson_id: task.lessonId,
        },
      });
      return newTask;
    } catch (e) {
      console.error({ e });
    }
  }

  async checkTask(task: checkTaskDto) {
    try {
      const currentTask = await prisma.task.findFirst({
        where: { id: task.task_id, current_answer_id: task.answer_id },
      });
      return !!currentTask;
    } catch (e) {
      console.error({ e });
    }
  }
}

export default new TaskService();
