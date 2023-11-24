import prisma from "../../database";
import { answerDto } from "./dto/answer.dto";

class AnswerService {
  async getAnswersById(id: number) {
    try {
      const answer = await prisma.answer.findFirst({
        where: { id },
      });
      if (!answer) throw new Error("Ответ не найден");
      return answer;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getAnswersByTasks(id: number) {
    try {
      const answers = await prisma.answer.findMany({
        where: { task_id: id },
      });
      if (!answers) throw new Error("Ответы не найден");
      return answers;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateAnswer(id: number, content: string, is_true: boolean) {
    try {
      const answer = await prisma.answer.update({
        where: { id: id },
        data: { content, is_true },
      });
      if (answer.is_true) {
        await prisma.task.update({
          where: { id: answer.task_id },
          data: { current_answer_id: id },
        });
      }
      return answer;
    } catch (e) {
      console.error({ e });
    }
  }

  async deleteAnswer(id: number) {
    try {
      await prisma.answer.delete({ where: { id } });
    } catch (e) {
      console.error({ e });
    }
  }

  async createAnswer(answer: answerDto) {
    try {
      const newAnswer = await prisma.answer.create({
        data: { content: answer.content, task_id: answer.taskId },
      });
      if (answer.is_true) {
        await prisma.task.update({
          where: { id: answer.taskId },
          data: { current_answer_id: newAnswer.id },
        });
      }
      return newAnswer;
    } catch (e) {
      console.error({ e });
    }
  }
}

export default new AnswerService();
