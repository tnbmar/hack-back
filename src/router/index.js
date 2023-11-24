import { userController } from "../modules/User/index.controller.js";
import { authController } from "../modules/Auth/index.controller.js";
import { subjectController } from "../modules/Subject/index.controller.js";
import { moduleController } from "../modules/Module/index.controller.js";
import { lessonController } from "../modules/Lesson/index.controller.js";
import { taskController } from "../modules/Task/index.controller.js";
import { answerController } from "../modules/Answer/index.controller.js";
import { rewardController } from "../modules/Reward/index.controller.js";
import { walletController } from "../modules/Wallet/index.controller.js";

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
