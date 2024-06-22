const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();
argon2 = require("argon2");
require('dotenv').config()




const authUser = async (user, password) => {
    console.log("Authenticating user");
    console.log(user);
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
      console.log(userFromDb);
  //   } catch (error) {
  //     console.log("Error in DB request", error);
  //   }
  // }

      if (!userFromDb) {
        console.log("User or password does not match");
        return;
      }
      const pass = await argon2.verify(userFromDb.password, password);
      console.log(pass);
      if (!pass) {
        if (userFromDb.retry >= 3) {
          if (userFromDb.retryExp > new Date()) {
            console.log("User is locked out");
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
        console.log("User or password does not match");
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
      console.log("User retries updated successfully");
      let authenticated_user = { id: userFromDb.id, name: userFromDb.username };
      console.log("User authenticated successfully", authenticated_user);
    } catch (error) {
      console.log("Error in DB request");
    }
    //Let's assume that a search within your DB returned the username and password match for "Kyle".
  };

  authUser("w", "w");