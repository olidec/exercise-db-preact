const router = require('express').Router();
const fs = require("fs");
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

router.get("/", async (req, res) => {
try {
    const exercises = await prisma.exercise.findMany({
    take: 5,
    orderBy: {
        createdAt: "desc",
    },
    });
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
  
      console.log(sortedExercises);
      return res.json(sortedExercises);
      // const writeToFile = (exercises) => {
      //   const contentAndSolution = exercises.map((exercise) => ({
      //     content: exercise.content,
      //     solution: exercise.solution,
      //   }));
  
      //   fs.writeFile(
      //     "/path/to/output.txt",
      //     JSON.stringify(contentAndSolution),
      //     (err) => {
      //       if (err) {
      //         console.error("Error writing to file:", err);
      //       } else {
      //         console.log("Data written to file successfully");
      //         res.download("/path/to/output.txt", "output.txt");
      //       }
      //     }
      //   );
      // };
  
      // writeToFile(exercises);
      // res.json(exercises);
    } catch (error) {
      console.error("Error in DB request", error);
      res.status(500).json({ msg: "Error in DB request", err: error });
    }
  });

module.exports = router;