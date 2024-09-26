const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();
argon2 = require("argon2");
require('dotenv').config()




const authUser = async (user, password) => {
    try {
      const userFromDb = await prisma.user.findUnique({
        where: { username: user },
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          retry: true,
          retryExp: true,
        },
      });

      if (!userFromDb) {
        return;
      }
      const pass = await argon2.verify(userFromDb.password, password);
      if (!pass) {
        if (userFromDb.retry >= 3) {
          if (userFromDb.retryExp > new Date()) {
            return;
          }
        }
        await prisma.user.update({
          where: {
            username: user,
          },
          data: {
            retry: userFromDb.retry + 1,
            retryExp: new Date(Date.now() + 1000 * 60 * 60),
          },
        });
        return;
      }

      await prisma.user.update({
        where: {
          username: user,
        },
        data: {
          retry: 0,
          retryExp: null,
        },
      });
      let authenticated_user = { id: userFromDb.id, name: userFromDb.username };
    } catch (error) {
    }
    //Let's assume that a search within your DB returned the username and password match for "Kyle".
  };

  authUser("w", "w");