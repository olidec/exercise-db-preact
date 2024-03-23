import { signal } from "@preact/signals"
import { loadCat } from "../local-storage/categories-local"

export const catList = signal([loadCat()])
