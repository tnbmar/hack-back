import prisma from "../../database";
import { lessonDto } from "./dto/lesson.dto";

class LessonService {
  async getLessonById(id: number) {
    try {
      const lesson = await prisma.lesson.findFirst({
        where: { id },
      });
      if (!lesson) throw new Error("Урок не найден");
      return lesson;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getLessonsByModule(id: number) {
    try {
      const lessons = await prisma.lesson.findMany({ where: { module_id: id } });
      if (!lessons) throw new Error("Уроки не найден");
      return lessons;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateLesson(id: number, name: string) {
    try {
      const lesson = await prisma.lesson.update({ where: { id: id }, data: { name } });
      return lesson;
    } catch (e) {
      console.error({ e });
    }
  }

  async deleteLesson(id: number) {
    try {
      await prisma.lesson.delete({ where: { id } });
    } catch (e) {
      console.error({ e });
    }
  }

  async createLesson(lesson: lessonDto) {
    try {
      const newLesson = await prisma.lesson.create({
        data: { name: lesson.name, module_id: lesson.moduleId },
      });
      return newLesson;
    } catch (e) {
      console.error({ e });
    }
  }
}

export default new LessonService();
