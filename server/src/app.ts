import express from "express";
const app = express();
import prisma from "./config/database";

// const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function main() {
  await prisma.$connect();
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
