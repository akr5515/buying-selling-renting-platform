import express from "express";
const app = express();
import prisma from "./config/database";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

// const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function main() {
  await prisma.$connect();

  const server = new ApolloServer({
    typeDefs: `
        type User {
            name: String!            
        }
        type Query {
            getUsers: [User]
        }
    `,
    resolvers: {
      Query: {
        getUsers: () => [{ name: "Angkon" }],
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));
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
