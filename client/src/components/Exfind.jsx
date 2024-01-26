import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";
// import { signal } from "../utils/signal";

export default function Exfind() {
    const [ex, setEx] = useState([]) 

    const getEx = async () => {
        const res = await askServer("/api/ex","GET")
        setEx(res)
        const element = document.getElementById("exercise")

        // for (let i = 0; i < res.length; i++) {
        //     const element = document.createElement("li")
        //     element.innerHTML = res[i].content
        //     document.getElementById("exercise").appendChild(element)
        // }

        ex.map((ex) => {
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