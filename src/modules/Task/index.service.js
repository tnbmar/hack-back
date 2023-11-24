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

  async checkTask(task, user) {
    try {
      const currentTask = await prisma.task.findFirst({
        where: { id: task.task_id, current_answer_id: task.answer_id },
      });
      await prisma.task.update({
        where: { id: task.task_id },
        data: { answered_id: user.id },
      });
      await this.updateInfoTasks(currentTask, user);

      return !!currentTask;
    } catch (e) {
      console.error({ e });
    }
  }
  async updateInfoTasks(currentTask, user) {
    //УРОКИ
    //вопросы в этом уроке
    const tasksInLesson = await prisma.task.findMany({
      where: { lesson_id: currentTask.lesson_id },
    });

    //мои отмеченные вопросы в этом уроке
    const myAnsweredTasksInLesson = await prisma.task.findMany({
      where: { lesson_id: currentTask.lesson_id, answered_id: user.id },
    });

    if (tasksInLesson.length === myAnsweredTasksInLesson.length) {
      await prisma.lesson.update({
        where: { id: currentTask.lesson_id },
        data: { answered_id: user.id },
      });
    }

    const currentLesson = await prisma.lesson.findFirst({
      where: { id: currentTask.lesson_id },
    });
    const currentModule = await prisma.module.findFirst({
      where: { id: currentLesson.module_id },
    });

    //уроки в этом модуле
    const lessonInModule = await prisma.lesson.findMany({
      where: { module_id: currentLesson.module_id },
    });

    //мои отмеченные уроки в этом модуле
    const myAnsweredLessonInModule = await prisma.lesson.findMany({
      where: { module_id: currentLesson.module_id, answered_id: user.id },
    });

    if (lessonInModule.length === myAnsweredLessonInModule.length) {
      await prisma.module.update({
        where: { id: currentLesson.module_id },
        data: { answered_id: user.id },
      });
    }
    //SUbjcts
    const moduleISubjects = await prisma.module.findMany({
      where: { subject_id: currentModule.subject_id },
    });

    const myAnsweredModulesInSubject = await prisma.lesson.findMany({
      where: { subject_id: currentModule.module_id, answered_id: user.id },
    });

    if (moduleISubjects.length === myAnsweredModulesInSubject.length) {
      await prisma.subject.update({
        where: { id: currentModule.subject_id },
        data: { answered_id: user.id },
      });
    }
  }
}

export default new TaskService();
