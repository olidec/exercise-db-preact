import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";

export default function Exfind() {
    const [ex, setEx] = signal([]) 

    const getEx = async () => {
        const element = document.getElementById("exercise")
        const res = await askServer("/api/ex","GET")
        ex = res.value

        for (let i = 0; i < ex.length; i++) {
            const element = document.createElement("li")
            element.innerHTML = ex[i].content
            document.getElementById("exercise").appendChild(element)
        }

        // res.map((ex) => {
        //     const el = document.createElement("li")
        //     el.innerHTML = ex.content
        //     document.getElementById("exercise").appendChild(el)
        // })

        MathJax.typeset([element])
    }

    return (
        <>
            <button className="pure-button" onClick={() => getEx()}>Get Exercises</button>
            <div>
                <ol id="exercise">

                </ol>
            </div>
        </>
    )
}