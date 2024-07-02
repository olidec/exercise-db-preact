const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

/**
 * erstelle eine neue Aufgabe in der Datenbank
 * @param {*} content - Inhalt der Aufgabe
 * @param {*} solution - Lösung der Aufgabe
 * @param {*} language - Programmiersprache der Aufgabe
 * @param {*} difficulty - Schwierigkeit der Aufgabe
 * @param {*} author - Autor der Aufgabe
 * @param {*} categories - Kategorien der Aufgabe
 * @param {*} subcategories - Unterkategorien der Aufgabe
 * @returns {Object} - erstellte Aufgabe
 */

async function createExercise(content, solution, language, difficulty, author, categories, subcategories) {
    try {
        const newEx = await prisma.exercise.create({
            data: {
                content,
                solution,
                language,
                difficulty,
                author: {
                    connect: { author },
                },
                categories: {
                    connect: categories,
                },
                subcategories: {
                    connect: subcategories,
                },
            },
            include: {
                author: true,
                categories: true,
                subcategories: true,
            },
        });
        return newEx;
    }
    catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

/**
 * aktualisiere eine Aufgabe in der Datenbank
 * @param {*} id - ID der Aufgabe
 * @param {*} content - Inhalt der Aufgabe
 * @param {*} solution - Lösung der Aufgabe
 * @param {*} language - Programmiersprache der Aufgabe
 * @param {*} difficulty - Schwierigkeit der Aufgabe
 * @param {*} author - Autor der Aufgabe
 * @param {*} categories - Kategorien der Aufgabe
 * @param {*} subcategories - Unterkategorien der Aufgabe
 * @returns {Object} - aktualisierte Aufgabe
 */

async function updateExercise(id, content, solution, language, difficulty, author, categories, subcategories) {
    try {
        const updatedEx = await prisma.exercise.update({
            where: {
                id: Number(id),
            },
            data: {
                content,
                solution,
                language,
                difficulty,
                author: {
                    connect: { author },
                },
                categories: {
                    connect: categories,
                },
                subcategories: {
                    connect: subcategories,
                },
            },
            include: {
                author: true,
                categories: true,
                subcategories: true,
        },
        });
        return updatedEx;
    }
    catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

/**
 * lösche eine Aufgabe aus der Datenbank
 * @param {*} id - ID der Aufgabe
 * @returns {Object} - gelöschte Aufgabe
 */

async function deleteExercise(id) {
    try {
        const deletedEx = await prisma.exercise.delete({
            where: {
                id: Number(id),
            },
        });
        return deletedEx;
    }
    catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

module.exports = { 
    createExercise: createExercise, 
    updateExercise: updateExercise, 
    deleteExercise: deleteExercise
 };