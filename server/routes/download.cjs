const router = require('express').Router();
const fs = require("fs");

const {getRecentExercises, getExercisesByIds }  = require("../controllers/exercises.cjs");

router.get("/", async (req, res) => {
try {
    console.log("-------> Downloading exercises");
    const exercises = await getRecentExercises();

    const contentAndSolution = exercises.map((exercise) => ({
    content: exercise.content,
    solution: exercise.solution,
    }));
    console.log(contentAndSolution);
    fs.writeFile(
    "server/output/output.txt",
    JSON.stringify(contentAndSolution),
    (err) => {
        if (err) {
        console.error("Error writing to file:", err);
        res.json({ msg: "Error writing to file", err: err });
        } else {
        console.log("Data written to file successfully");
        res.download("server/output/output.txt", "output.txt");
        }
    }
    );
} catch (error) {
    res.json({ msg: "Error in DB request", err: error });
}
});
  
  router.post("/", async (req, res) => {
    const { exerciseIds } = req.body;
    console.log(exerciseIds);
    try {
      const sortedExercises = await getExercisesByIds(exerciseIds);
  
      console.log(sortedExercises);
      return res.json(sortedExercises);

    } catch (error) {
      console.error("Error in DB request", error);
      res.status(500).json({ msg: "Error in DB request", err: error });
    }
  });

module.exports = router;