const { getSingleExercise } = require("../controllers/exercises.cjs");

async function canEditEx(req, res, next) {
    console.log(JSON.stringify(req.body));
    const userId = req.user.id;
    const exId = req.body.id;
    console.log(`userId: ${req}, exId: ${req.body.id}`);
    const exFromDb = await getSingleExercise(exId);
    if (exFromDb.authorId !== userId) {
        return res.status(401).json({ msg: "You are not the author of this exercise" });
    }
    return next();
}

module.exports = { canEditEx };