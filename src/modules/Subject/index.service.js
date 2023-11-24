import prisma from "../../database/index.js";

class SubjectService {
  async getSubjectById(id) {
    try {
      const subject = await prisma.subject.findFirst({
        where: { id },
      });
      if (!subject) throw new Error("Предмет не найден");
      return subject;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllSubjects() {
    try {
      const subjects = await prisma.subject.findMany();
      if (!subjects) throw new Error("Предмет не найден");
      return subjects;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateSubject(id, name) {
    try {
      const subject = await prisma.subject.update({ where: { id: id }, data: { name } });
      return subject;
    } catch (e) {
      console.error({ e });
    }
  }

  async deleteSubject(id) {
    try {
      await prisma.subject.delete({ where: { id } });
    } catch (e) {
      console.error({ e });
    }
  }

  async createSubject(subject) {
    try {
      const newSubject = await prisma.subject.create({ data: { name: subject.name } });
      return newSubject;
    } catch (e) {
      console.error({ e });
    }
  }
}

export default new SubjectService();
