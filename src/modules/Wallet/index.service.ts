import prisma from "../../database";

class WalletService {
  async getWalletAddress() {
    try {
      const wallet = await prisma.wallet.findFirst();
      if (!wallet) throw new Error("Кошелек не найден");
      return wallet;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateWalletAddress(address: string) {
    try {
      const wallet = await prisma.wallet.findFirst();
      if (wallet) {
        const newWallet = await prisma.wallet.update({
          where: { id: wallet?.id },
          data: { address },
        });
        return newWallet;
      } else {
        throw new Error("Кошелек не найден");
      }
    } catch (e) {
      console.error({ e });
    }
  }
}

export default new WalletService();
