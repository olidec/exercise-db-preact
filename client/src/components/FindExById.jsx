import { useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";

export default function FindExById() {
    const ex = signal([])
    const id = signal(1)

    const loadEx = async () => {
        const res = await askServer("/api/ex/","GET")
        ex.value = res
    }
    useEffect(() => {
        loadEx()
    }, [])  

    const onChange = (e) => {
        e.preventDefault()
        const { value } = e.target
        id.value = value
        // unccoment line below to update view immediately on change
        // getEx(e)
    }

    // Alle Aufgaben werden in der Variable ex.value gespeichert. Dies sollte später geändert werden, da es nicht gut ist, wenn alle AUfgaben auf einmal geladen werden (Speicherplatz, Ladezeit, etc.) Idealerweise wird beim updaten der id nur die Aufgabe mit der entsprechenden id geladen.
    const getEx = (e) => {
        e.preventDefault()
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
        myexid.innerHTML = ex.value[id].id
        myexcont.innerHTML = ex.value[id].content
        myexsol.innerHTML = ex.value[id].solution
        MathJax.typeset([extable])
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
            <input type="number" value={id} onChange={onChange}/>
            <button className="pure-button">Get Exercise from ID</button>
            </form>
            <div>
                <table id="extable" className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Content</th>
                            <th>Solution</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="myexid"></td>
                            <td id="myexcont"></td>
                            <td id="myexsol"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}