import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";

export default function FindExById() {
    const myId = signal(1)

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
        const route = `/api/ex?id=${myId.value}`
        // console.log(route)
        const res = await askServer(route,"GET")
        // console.log(res.content)
    
        myexidnew.innerHTML = res.id
        myexcontnew.innerHTML = res.content
        myexsolnew.innerHTML = res.solution
        MathJax.typeset([extablenew])
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