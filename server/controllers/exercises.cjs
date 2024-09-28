const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

/**
 * Lese die letzten fünf Übungen aus der Datenbank
 * @returns {Array} - Array mit den letzten fünf Übungen
 */

async function getRecentExercises() {
    try {

        const exercises = await prisma.exercise.findMany({
        take: 5,
        orderBy: {
            updatedAt: "desc",
        },
        });
        return exercises;
    } catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

/**
 * Lese eine einzelne Aufgabe aus der Datenbank anhand der übergebenen ID
 * @param {*} id - ID der Aufgabe
 * @returns {Object} - Aufgabe
 */

async function getSingleExercise(id) {
    try {
        const exercise = await prisma.exercise.findUnique({
        where: {
            id: Number(id),
        },
        });
        return exercise;
    } catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}


/**
 * Lese Übungen aus der Datenbank anhand der übergebenen IDs
 * @param {*} exerciseIds - Array mit den IDs der Übungen
 * @returns {Array} - Array mit den Übungen
 */

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

/**
 * Suche Aufgaben nach Kategorie
 * @param {*} cat - Kategorie
 * @returns {Array} - Array mit den Übungen
 */

async function getExercisesByCategory(cat) {
    try {
        const exercises = await prisma.exercise.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                categories: { name: cat },
            },
            include: {
                categories: true,
                subcategories: true,
            },
        });
        return exercises;
    } catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

/**
 * Suche Aufgaben nach Unterkategorie
 * @param {*} cat - Kategorie
 * @param {*} subcat - Unterkategorie
 * @returns {Array} - Array mit den Übungen
 */

async function getExercisesBySubcategory(cat, subcat) {
    try {
        const exercises = await prisma.exercise.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                categories: { name: cat },
                subcategories: { name: subcat },
            },
            include: {
                categories: true,
                subcategories: true,
            },
        });
        return exercises;
    } catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

async function getExerciseBySearch(search) {
    try {
        const exercises = await prisma.exercise.findMany({
            where: { content: { contains: search, mode: 'insensitive' } },
        });
        return exercises;
    } catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

module.exports = {
    getRecentExercises: getRecentExercises,
    getSingleExercise: getSingleExercise,
    getExercisesByIds: getExercisesByIds,
    getExercisesByCategory: getExercisesByCategory,
    getExercisesBySubcategory: getExercisesBySubcategory,
    getExerciseBySearch: getExerciseBySearch,
};