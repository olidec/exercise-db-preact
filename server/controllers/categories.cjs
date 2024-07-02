const   PrismaClient = require("@prisma/client");
const   prisma = new PrismaClient.PrismaClient();

/**
 * Lese die Kategorien aus der Datenbank
 * @returns {Array} - Array mit den Kategorien
 */

async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                subcategories: true,
            },
        });
        return categories;
    } catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

async function getSubcategories() {
    try {
        const subcategories = await prisma.subcategory.findMany(
            {
                include: {
                    exercises: true,
                },
            }
        );
        return subcategories;
    } catch (error) {
        return { msg: "Error in DB request", err: error };
    }
}

module.exports = {
    getCategories: getCategories,
    getSubcategories: getSubcategories,
};