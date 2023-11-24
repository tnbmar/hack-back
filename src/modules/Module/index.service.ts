import prisma from "../../database";
import { moduleDto } from "./dto/module.dto";

class ModuleService {
  async getModuleById(id: number) {
    try {
      const module = await prisma.module.findFirst({
        where: { id },
      });
      if (!module) throw new Error("Модуль не найден");
      return module;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getModulesBySubject(id: number) {
    try {
      const modules = await prisma.module.findMany({ where: { subject_id: id } });
      if (!modules) throw new Error("Модули не найден");
      return modules;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateModule(id: number, name: string) {
    try {
      const module = await prisma.module.update({ where: { id: id }, data: { name } });
      return module;
    } catch (e) {
      console.error({ e });
    }
  }

  async deleteModule(id: number) {
    try {
      await prisma.module.delete({ where: { id } });
    } catch (e) {
      console.error({ e });
    }
  }

  async createModule(module: moduleDto) {
    try {
      const newModule = await prisma.module.create({
        data: { name: module.name, subject_id: module.subjectId },
      });
      return newModule;
    } catch (e) {
      console.error({ e });
    }
  }
}

export default new ModuleService();
