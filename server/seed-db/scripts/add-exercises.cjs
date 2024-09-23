const PrismaClient = require("@prisma/client");
const fs = require("fs");
const prisma = new PrismaClient.PrismaClient();
require("dotenv").config();

const exercises = require("../data/exercises.json");

async function setup() {
  const newExercises = await prisma.exercise.createMany({
    data: exercises,
    // only for postgres
    skipDuplicates: true,
  });
  console.log(newExercises);
}

module.exports = { setupExercises: setup };
