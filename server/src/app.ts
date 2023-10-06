import express from "express";
import fs from "fs";
import path from "path";

const app = express();
import prisma from "./config/database";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
// import ProductController from "./controller/productController";
// import customTypeDefs from "./graphQL/typedefs.graphql";
import customResolvers from "./graphQL/resolvers.graphql";
import UserController from "./controller/userController";
import ProductController from "./controller/productController";

// Read the contents of your .gql file
const schemaFilePath = path.join(__dirname, "./graphQL/typedefs.schema.gql");
const schemaFileContent = fs.readFileSync(schemaFilePath, "utf8");
// const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function main() {
  await prisma.$connect();

  const server = new ApolloServer({
    typeDefs: schemaFileContent,
    resolvers: customResolvers,
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql/v1", expressMiddleware(server));
  app.listen(process.env.PORT ? process.env.PORT : 8000, () => {
    console.log(
      `Application is running on ${process.env.PORT ? process.env.PORT : 8000}`
    );
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
