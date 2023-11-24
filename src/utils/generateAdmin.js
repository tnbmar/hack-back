import Connect from "connect-pg-simple";
import session from "express-session";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { app } from "../../main.js";
import prisma from "../database/index.js";

export const generateAdminJS = () => {
  const DEFAULT_ADMIN = {
    email: "admin@example.com",
    password: "password",
  };

  AdminJS.registerAdapter({ Database, Resource });

  const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
  };

  const adminOptions = {
    resources: [
      {
        resource: { model: getModelByName("User"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Reward"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Subject"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Module"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Lesson"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Task"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Answer"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Wallet"), client: prisma },
        options: {},
      },
    ],
  };
  const admin = new AdminJS(adminOptions);

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.DATABASE_URL,
    },
    tableName: "session",
    createTableIfMissing: true,
  });
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: "sessionsecret",
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: "sessionsecret",
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);
};
