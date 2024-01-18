import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";


export default function Exfind() {
    const [ex, setEx] = useState([{id:0}]) 
    // useEffect(() => {
    //     const loadAllExerciseIds = async () => {
    //         const res = await askServer("/api/exercise-ids", "GET");
    //         setEx(res.map(exercise => exercise.id));
    //     };

    //     loadAllExerciseIds();
    // }, []);

    const getEx = async () => {
        const res = await askServer("/api/ex","GET")
        setEx(res)
        console.log(res[1].content)
        document.getElementById("exercise").innerHTML = res[5].content
        // res.map((exercise) => (
        //     <li key={exercise.id}>{exercise.content}</li>
        // ))
    }

    return (
        <>
            {/* <div>
                <label htmlFor="exercise">Exercise Ids</label>
                <select>
                    {ex.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                            {exercise.summary}
                        </option>
                    ))}
                </select>
            </div> */}
            <button onClick={() => getEx()}>Get Exercises</button>
            <div>
                <ol id="exercise">
                    
                </ol>
            </div>

        </>
    )
}