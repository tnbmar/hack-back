import prisma from "../../database/index.js";

class RewardService {
  async getAllRewards() {
    try {
      const rewards = await prisma.reward.findMany();
      if (!rewards) throw new Error("Награды не найдены");
      return rewards;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createReward(name) {
    try {
      const reward = await prisma.reward.create({ data: { name } });
      return reward;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new RewardService();
