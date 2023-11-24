import prisma from "../../database";
import { encodeToken } from "../../utils/encodeToken";
import { User } from "@prisma/client";
import sha256 from "sha256";
import { RegistrationDto } from "../Auth/dto/registration-dto";

class UserService {
  async createUser(newUserDto: RegistrationDto) {
    const { username, password, email, role } = newUserDto;
    const userRole = role ? role : "user";
    try {
      const newUser = await prisma.user.create({
        data: { username, password: sha256(password), email: email, role: userRole },
      });
      return newUser;
    } catch (e) {
      console.error({ e });
    }
  }

  async getUserById(id: number) {
    try {
      const user = await prisma.user.findFirst({
        where: { id },
      });
      if (!user) throw new Error("Пользователь не найден");
      return user;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      if (!users) throw new Error("Пользователь не найден");
      return users;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getUserByToken(token: string) {
    const id = encodeToken(token);

    if (id) {
      const user = await this.getUserById(id);
      return user;
    } else {
      throw new Error("Not authorization");
    }
  }

  async getUserByUsernameAndPassword(username: string, password: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { username, password: sha256(password) },
      });
      return user;
    } catch (error) {
      return;
    }
  }

  async updateUser(
    token: string,
    updatetedData: Partial<User & { file: Express.Multer.File }>
  ) {
    try {
      const user = await this.getUserByToken(token);
      if (!user) return;

      await prisma.user.update({ where: { id: user.id }, data: updatetedData });
    } catch (e) {
      console.error({ e });
    }
  }

  async deleteUser({ id }: { id: number }) {
    await prisma.user.delete({ where: { id } });
  }

  async changeRole(id: number, role: string) {
    try {
      const user = await prisma.user.update({ where: { id: id }, data: { role } });
      return user;
    } catch (e) {
      console.error({ e });
    }
  }
}

export default new UserService();
