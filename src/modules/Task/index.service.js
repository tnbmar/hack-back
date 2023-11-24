import prisma from "../../database/index.js";

class TaskService {
  async getTaskById(id) {
    try {
      const task = await prisma.task.findFirst({
        where: { id },
        include: { answers: true },
      });
      if (!task) throw new Error("Вопрос не найден");
      return task;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTasksByLessons(id) {
    try {
      const tasks = await prisma.task.findMany({
        where: { lesson_id: id },
        include: { answers: true },
      });
      if (!tasks) throw new Error("Вопросы не найден");
      return tasks;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateTask(id, content) {
    try {
      const task = await prisma.task.update({ where: { id: id }, data: { content } });
      return task;
    } catch (e) {
      console.error({ e });
    }
  }

  async deleteTask(id) {
    try {
      await prisma.task.delete({ where: { id } });
    } catch (e) {
      console.error({ e });
    }
  }

  async createTask(task) {
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

  async checkTask(task) {
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
