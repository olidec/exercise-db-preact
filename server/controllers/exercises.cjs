const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

/**
 * 
 * @param {*} exerciseIds
 * @returns
 */

async function getRecentExercises() {
    try {
        const exercises = await prisma.exercise.findMany({
        take: 5,
        orderBy: {
            createdAt: "desc",
        },
        });
        return exercises;
    } catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

async function getExercisesByIds(exerciseIds) {
    try {
        const exercises = await prisma.exercise.findMany({
        where: {
            id: {
            in: exerciseIds,
            },
        },
        });
        const sortedExercises = exerciseIds.map((id) => {
            const exercise = exercises.find((ex) => ex.id === id);
            return exercise;
          });
        return sortedExercises;
    } catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

module.exports = {
    getRecentExercises: getRecentExercises,
    getExercisesByIds: getExercisesByIds,
};