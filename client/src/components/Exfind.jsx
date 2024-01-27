import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";
import { signal, useSignal } from "@preact/signals";

export default function Exfind() {
    const ex = useSignal([]) 

    const getEx = async () => {
        // const element = document.getElementById("exercise")
        const res = await askServer("/api/ex/1","GET")
        ex.value = res
        console.log(ex.value.content)
        // ex.value = res

        // for (let i = 0; i < ex.value.length; i++) {
        //     const el = document.createElement("li")
        //     el.innerHTML = ex.value[i].content
        //     document.getElementById("exercise").appendChild(el)
        //     MathJax.typeset([el])
        // }
        const el = document.createElement("li")
        el.innerHTML = ex.value.content
        document.getElementById("exercise").appendChild(el)

        // ex.map((ex) => {
        //     const el = document.createElement("li")
        //     el.innerHTML = ex.content
        //     document.getElementById("exercise").appendChild(el)
        //     MathJax.typeset([el])
        // })

        // MathJax.typeset([element])
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