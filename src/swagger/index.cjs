const swaggerAutogen = require("swagger-autogen");
const { glob } = require("glob");
const dotenv = require("dotenv");
const dotenvFlow = require("dotenv-flow");

dotenv.config();
dotenvFlow.config();

const doc = {
  info: {
    title: "HACKATON_BACK",
    version: "1.0.0",
    description: "API HACKATON_BACK.",
  },
  host: process.env.BACK_HOST ? process.env.BACK_HOST : "localhost:3003",
  basePath: "/api",
  schemes:process.env.BACK_HOST ? ["https"] : ["http"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ Bearer: [] }],
  definitions: {},
};

const outputFile = "./output.json";
const endpointsFiles = glob.sync("./src/modules/*/index.controller.js");
swaggerAutogen()(outputFile, endpointsFiles, doc);
