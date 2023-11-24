import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";
import dotenvFlow from "dotenv-flow";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/swagger/output.json" assert { type: "json" };
import customControllers from "./src/router/index.js";
import bodyParser from "body-parser";
import prisma from "./src/database/index.js";
import cors from "cors";
import { generateAdminJS } from "./src/utils/generateAdmin.js";

dotenv.config();
dotenvFlow.config();
export const app = express();

generateAdminJS();

const httpServer = createServer(app);
app.use(
  cors({
    origin: "http://192.168.1.45",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", ...customControllers);
app.use("/media", express.static("src/images"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function bootstrap() {
  try {
    httpServer.listen(process.env.PORT ?? 3000, async () => {
      console.log("started");

      await prisma.$connect();
    });
  } catch (e) {
    console.error({ e });
  }
}

bootstrap();