import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";


export default function Exfind() {
    const [ex, setEx] = useState([{id:0}]) 

    const getEx = async () => {
        const res = await askServer("/api/ex","GET")
        setEx(res)
        // console.log(res[1].content)
        const element = document.getElementById("exercise")
        element.innerHTML = res[1].content
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