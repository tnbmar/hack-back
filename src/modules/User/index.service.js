import prisma from "../../database/index.js";
import { encodeToken } from "../../utils/encodeToken.js";
import sha256 from "sha256";

class UserService {
  async createUser(newUserDto) {
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

  async getUserById(id) {
    try {
      const user = await prisma.user.findFirst({
        where: { id },
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

  async changeRole(id, role) {
    try {
      const user = await prisma.user.update({ where: { id: id }, data: { role } });
      return user;
    } catch (e) {
      console.error({ e });
    }
  }
}

export default new UserService();
