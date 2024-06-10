const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

module.exports = {
  getUser: async (username) => {
    return await prisma.user.findUnique({
      where: { username },
    });
  },
};
