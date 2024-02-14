import { signal } from "@preact/signals"
import { askServer } from "../utils/connector"

const cat = signal([]) 

const loadCat = async () => {
    const res = await askServer("/api/cat/","GET")
    cat.value = res
}

export { cat, loadCat }