import prisma from "../../database/index.js";
import { encodeToken } from "../../utils/encodeToken.js";
import rewardService from "../Reward/index.service.js";
import sha256 from "sha256";

class UserService {
  async createUser(newUserDto) {
    const { username, password, email } = newUserDto;
    const taskCount = await prisma.task.count();

    try {
      const newUser = await prisma.user.create({
        data: { username, password: sha256(password), email: email, taskCount },
      });
      const regReward = await prisma.reward.findFirst({ where: { name: "New" } });
      if (regReward) {
        await prisma.user.update({
          where: { id: newUser.id },
          data: {
            rewards: {
              connect: {
                id: regReward.id,
              },
            },
          },
        });
      } else {
        const newReward = await prisma.reward.create({ data: { name: "New" } });
        await prisma.user.update({
          where: { id: newUser.id },
          data: {
            rewards: {
              connect: {
                id: newReward.id,
              },
            },
          },
        });
      }
      return newUser;
    } catch (e) {
      console.error({ e });
    }
  }

  async getUserById(id) {
    const taskCount = await prisma.task.count();
    try {
      await prisma.user.update({
        where: { id },
        data: { taskCount },
      });
      const user = await prisma.user.findFirst({
        where: { id },
        include: {
          answeredTasks: true,
          answeredLessons: true,
          answeredModules: true,
          answeredSubjects: true,
          rewards: true,
        },
      });
      if (!user) throw new Error("Пользователь не найден");
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      if (!users) throw new Error("Пользователь не найден");
      return users;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getLeaders() {
    try {
      const users = await prisma.user.findMany({
        take: 5,
        include: { answeredTasks: true },
      });
      const topUsers = users.sort(
        (a, b) => b.answeredTasks?.length - a.answeredTasks?.length
      );
      if (!topUsers) throw new Error("Лидеры не найдены");
      return topUsers;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async getUserByToken(token) {
    const id = encodeToken(token);
    if (id) {
      const user = await this.getUserById(id);
      return user;
    } else {
      throw new Error("Not authorization");
    }
  }

  async getUserByUsernameAndPassword(username, password) {
    try {
      const user = await prisma.user.findFirst({
        where: { username, password: sha256(password) },
      });
      return user;
    } catch (error) {
      return;
    }
  }

  async deleteUser({ id }) {
    await prisma.user.delete({ where: { id } });
  }
}

export default new UserService();
