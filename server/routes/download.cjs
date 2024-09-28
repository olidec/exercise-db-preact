const router = require('express').Router();

const {getRecentExercises, getExercisesByIds }  = require("../controllers/exercises.cjs");
const {fileWriter, texContent}  = require("../controllers/fileWriter.cjs");

router.get("/", async (req, res) => {
try {
    const exercises = await getRecentExercises();

    const contentAndSolution = exercises.map((exercise) => ({
    content: exercise.content,
    solution: exercise.solution,
    }));
    const success = await fileWriter(contentAndSolution);
    if (!success) {
      throw new Error("Error writing exercises");
    }
    res.download("/home/node/server/output/output.txt", "output.txt");
} catch (error) {
    res.json({ msg: "ROUTES: Error writing exercises", err: error });
}
});
  
  router.post("/", async (req, res) => {
    const { exerciseIds } = req.body;
    try {
        const sortedExercises = await getExercisesByIds(exerciseIds);
        const contentAndSolution = sortedExercises.map((exercise) => ({
            content: exercise.content,
            solution: exercise.solution,
            }));
        const data = texContent(contentAndSolution);
        res.json(data);
    } catch (error) {
      console.error("Error in DB request", error);
      res.status(500).json({ msg: "Error in DB request", err: error });
    }
  });

module.exports = router;