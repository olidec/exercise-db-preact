const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();
const argon2 = require("argon2");

/**
 * Erstelle einen neuen User in der Datenbank
 * @param {*} username
 * @param {*} email
 * @param {*} password
 * @returns
 */
async function createUser(username, email, password) {
  const hashedPassword = await argon2.hash(password);
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
  });
  return user;
}

/**
 * hole User aus der Datenbank
 * @param {*} options
 * @returns
 */
async function getUser(options = { id, username, email }) {
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
}

async function findOrCreateUser(email, username, password) {
  hashedPassword = await argon2.hash(password);
  const emailExists = await prisma.user.findUnique({ where: { email: email } });
  const usernameExists = await prisma.user.findUnique({
    where: { username: username },
  });
  if (emailExists) {
    return { msg: "Email already exists", success: false };
  } else if (usernameExists) {
    return { msg: "Username already exists", success: false };
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword,
      },
    });
    return { msg: "User created", success: true, user: newUser };
  }
}

module.exports = {
  getUser: getUser,
  createUser: createUser,
  findOrCreateUser: findOrCreateUser,
};
