import { signal } from "@preact/signals"
import { askServer } from "../utils/connector"

const ex = signal([]) 

const loadEx = async () => {
    const res = await askServer("/api/ex/","GET")
    ex.value = res
}

export { ex, loadEx }