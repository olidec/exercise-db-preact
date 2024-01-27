import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";

export default function Exfind() {
    const ex = signal([]) 

    const getEx = async () => {
        const res = await askServer("/api/ex","GET")
        ex.value = res
        const element = document.getElementById("exercise")

        res.map((ex) => {
            const el = document.createElement("li")
            el.innerHTML = ex.content
            document.getElementById("exercise").appendChild(el)
        })

        MathJax.typeset([element])
    }

    return (
        <>
            <button onClick={() => getEx()}>Get Exercises</button>
            <div>
                <ol id="exercise">
                    
                </ol>
            </div>
        </>
    )
}