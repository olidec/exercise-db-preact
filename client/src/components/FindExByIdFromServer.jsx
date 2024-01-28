import { useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";

export default function FindExById() {
    // const ex = signal("")
    const myId = signal(1)

    // const loadEx = async () => {
    //     const res = await askServer("/api/ex/","GET")
    //     ex.value = res
    // }
    // useEffect(() => {
    //     loadEx()
    // }, [])  

    const onChange = (e) => {
        e.preventDefault()
        const { value } = e.target
        myId.value = value
        // unccoment line below to update view immediately on change
        // getEx(e)
    }

    // Alle Aufgaben werden in der Variable ex.value gespeichert. Dies sollte später geändert werden, da es nicht gut ist, wenn alle AUfgaben auf einmal geladen werden (Speicherplatz, Ladezeit, etc.) Idealerweise wird beim updaten der id nur die Aufgabe mit der entsprechenden id geladen.
    const getEx = async (e) => {
        e.preventDefault()
        const route = "/api/ex/" + myId.value
        // console.log(route)
        const res = await askServer(route,"GET")
        // console.log(res.content)
        // ex.value = res
    
        // const element = document.getElementById("exercise")
        // console.log(ex.value[id])
        // ex.value = res

        // for (let i = 0; i < ex.value.length; i++) {
        //     const el = document.createElement("li")
        //     el.innerHTML = ex.value[i].content
        //     document.getElementById("exercise").appendChild(el)
        //     MathJax.typeset([el])
        // }
        // const el = document.createElement("li")
        myexidnew.innerHTML = res.id
        myexcontnew.innerHTML = res.content
        myexsolnew.innerHTML = res.solution
        MathJax.typeset([extablenew])
        // document.getElementById("exercise").appendChild(el)

        // ex.value.map((ex) => {
        //     const el = document.createElement("li")
        //     el.innerHTML = ex.content
        //     document.getElementById("exercise").appendChild(el)
        //     MathJax.typeset([el])
        // })

        // MathJax.typeset([element])
    }

    return (
        <>
            <form onSubmit={(e) => getEx(e)}>
                <label htmlFor="exid-2">Select Exercise via ID</label>
            <input id="exid-2" type="number" value={myId} onChange={onChange}/>
            <button className="pure-button">Get Exercise from ID</button>
            </form>
            <div>
                <table id="extablenew" className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Content</th>
                            <th>Solution</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="myexidnew"></td>
                            <td id="myexcontnew"></td>
                            <td id="myexsolnew"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}