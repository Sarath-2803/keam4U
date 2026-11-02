import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { QuestionSwagger } from "../modules/questions/index.js";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Keam4u API",
      version: "1.0.0",
      description: "API documentation for Keam4u project",
    },
    paths: {
      ...QuestionSwagger,
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi}