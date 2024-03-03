import { askServer } from "../utils/connector";

const LOCAL_KEY_CATEGORIES = 'categories';

// export const readCat = async () => {
//     const res = await askServer("/api/cat/","GET")
//     localStorage.setItem(LOCAL_KEY_CATEGORIES, res);
// }

localStorage.setItem(LOCAL_KEY_CATEGORIES, JSON.stringify([{name: "Algebra"},{name: "Analysis"},{name: "Geometry"},{name: "Combinatorics"},{name: "Number Theory"}]));

export const loadCat =  () => {
    const cat = localStorage.getItem(LOCAL_KEY_CATEGORIES);
    if (cat) {
        return JSON.parse(cat);
    }
    else {
        return []
}
}


// export const saveCat = (cat) => {
//     localStorage.setItem(LOCAL_KEY_CATEGORIES, JSON.stringify(cat));
// }