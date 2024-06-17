const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

module.exports = {
  getUser: async (options = { id, username, email }) => {
    let user = null;
    if (options.id) {
      user = await prisma.user.findUnique({
        where: { id: options.id },
      });
    } else if (options.username) {
      user = await prisma.user.findUnique({
        where: { username: options.username },
      });
    } else if (options.email) {
      user = await prisma.user.findUnique({
        where: { email: options.email },
      });
    } else throw new Error("No user identifier provided", options);

    if (user) return { mgs: "User found", user, success: true };
    else return { msg: "User not found", success: false };
  },
};
