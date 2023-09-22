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

  // await UserController.createUser(
  //   "Second User",
  //   "Last ",
  //   "b@gmail.com",
  //   "some address",
  //   "+990",
  //   "123123"
  // );

  // await ProductController.createProduct({
  //   title: "Third product",
  //   description: "Second Description",
  //   categories: [],
  //   price: 11,
  //   rent: 11,
  //   rentInterval: "some time",
  //   ownerId: "3021cf87-2c08-4307-b9c3-facef9e2b9f4",
  // });

  // await ProductController.createCategory("cars");
  // await ProductController.getAllCategories();
  // await ProductController.getAllProducts();

  // await ProductController.updateProduct({
  //   productId: "0dbb7126-67a8-40ba-852d-4e063de67be5",
  //   title: "Updated product2",
  //   description: "Second Description",
  //   categories: [1, 3],
  //   price: 11,
  //   rent: 11,
  //   rentInterval: "some time",
  // });
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
