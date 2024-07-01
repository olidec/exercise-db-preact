const router = require('express').Router();

const {getRecentExercises, getExercisesByIds }  = require("../controllers/exercises.cjs");
const {fileWriter, writeLatex}  = require("../controllers/fileWriter.cjs");

router.get("/", async (req, res) => {
try {
    console.log("-------> Downloading exercises");
    const exercises = await getRecentExercises();

    const contentAndSolution = exercises.map((exercise) => ({
    content: exercise.content,
    solution: exercise.solution,
    }));
    console.log(contentAndSolution);
    await fileWriter(contentAndSolution);
    res.download("server/output/output.txt", "output.txt");
} catch (error) {
    res.json({ msg: "Error in DB request", err: error });
}
});
  
  router.post("/", async (req, res) => {
    const { exerciseIds } = req.body;
    console.log(exerciseIds);
    try {
        const sortedExercises = await getExercisesByIds(exerciseIds);
        const contentAndSolution = sortedExercises.map((exercise) => ({
            content: exercise.content,
            solution: exercise.solution,
            }));
        console.log(contentAndSolution);
        await writeLatex(contentAndSolution);
        res.download("server/output/output.txt", "output.txt");
    } catch (error) {
      console.error("Error in DB request", error);
      res.status(500).json({ msg: "Error in DB request", err: error });
    }
  });

module.exports = router;