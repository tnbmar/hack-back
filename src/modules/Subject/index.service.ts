import prisma from "../../database";
import { RegistrationDto } from "../Auth/dto/registration-dto";
import { subjectDto } from "./dto/subject.dto";

class SubjectService {
  async getSubjectById(id: number) {
    try {
      const subject = await prisma.subject.findFirst({
        where: { id },
      });
      if (!subject) throw new Error("Предмет не найден");
      return subject;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getAllSubjects() {
    try {
      const subjects = await prisma.subject.findMany();
      if (!subjects) throw new Error("Предмет не найден");
      return subjects;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateSubject(id: number, name: string) {
    try {
      const subject = await prisma.subject.update({ where: { id: id }, data: { name } });
      return subject;
    } catch (e) {
      console.error({ e });
    }
  }

  async deleteSubject(id: number) {
    try {
      await prisma.subject.delete({ where: { id } });
    } catch (e) {
      console.error({ e });
    }
  }

  async createSubject(subject: subjectDto) {
    try {
      const newSubject = await prisma.subject.create({ data: { name: subject.name } });
      return newSubject;
    } catch (e) {
      console.error({ e });
    }
  }
}

export default new SubjectService();
