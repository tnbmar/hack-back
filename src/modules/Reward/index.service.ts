import prisma from "../../database";

class RewardService {
  async getAllRewards() {
    try {
      const rewards = await prisma.reward.findMany();
      if (!rewards) throw new Error("Награды не найдены");
      return rewards;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new RewardService();
