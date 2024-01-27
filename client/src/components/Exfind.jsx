import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";
import { signal, useSignal } from "@preact/signals";

export default function Exfind() {
    // const currentEx = signal(1)
    const ex = useSignal([]) 

    const getEx = async () => {
        // const element = document.getElementById("exercise")
        const res = await askServer("/api/ex/","GET")
        console.log(res.value.content)
        ex.value = res
        // console.log(ex.value.content)
        // ex.value = res

        for (let i = 0; i < ex.value.length; i++) {
            const el = document.createElement("li")
            el.innerHTML = ex.value[i].content
            document.getElementById("exercise").appendChild(el)
            MathJax.typeset([el])
        }
        
        // const el = document.createElement("li")
        // el.innerHTML = ex.value.content
        // document.getElementById("exercise").innerHTML = res.content

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
            <form className="pure-form">
            <fieldset>
            <select name="exno" id="exno">
                {Array.from({length: 5}, (_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                ))}
            </select>
            <button className="pure-button pure-button-primary" onClick={() => getEx()}>Get Exercises</button>
            </fieldset>
            </form>
            <div>
                <ol className="exercise"></ol>
            </div>
            {/* <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Exercise No.</th>
                                <th>Exercise Text</th>
                                <th>Solution</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td></td>
                            <td id="exercise"></td>
                            <td></td>
                            </tr>
                        </tbody>
                    </table>
            </div> */}
        </>
    )
}