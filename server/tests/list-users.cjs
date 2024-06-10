const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();
require("dotenv").config();

async function listUsers() {
  const users = await prisma.user.findMany();
  console.log(users);
  // const users = await prisma.user.create({
  //   data: {
  //     email: "w@w",
  //     username: "W",
  //     password: "w",
  //   },
  // });
  // console.log(users);

  const userFromDb = await prisma.user.findUnique({
    where: { username: "w" },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      retry: true,
      retryExp: true,
    },
  });
  console.log(userFromDb);
}

listUsers();
