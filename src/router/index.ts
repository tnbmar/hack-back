import { userController } from "../modules/User/index.controller";
import { authController } from "../modules/Auth/index.controller";
import { subjectController } from "../modules/Subject/index.controller";
import { moduleController } from "../modules/Module/index.controller";
import { lessonController } from "../modules/Lesson/index.controller";
import { taskController } from "../modules/Task/index.controller";
import { answerController } from "../modules/Answer/index.controller";
import { rewardController } from "../modules/Reward/index.controller";
import { walletController } from "../modules/Wallet/index.controller";

const customControllers = [
  userController,
  authController,
  subjectController,
  moduleController,
  lessonController,
  taskController,
  answerController,
  rewardController,
  walletController,
];

export default customControllers;
