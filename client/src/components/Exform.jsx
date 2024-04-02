import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";

export default function ExForm() {
    const [ex, setEx] = useState({
        summary: '',
        content:'',
        solution:''
    })

    
    let categories = ['-- Wähle bitte eine Kategorie --','Zahlen', 'Arithmetik und Algebra', 'Geometrie', 'Analysis', 'Stochastik', 'Vertiefende Themen']
    const subcategories = [['-- Wähle bitte zuerst eine Kategorie --'],
    ['-- Wähle bitte eine Unterkategorie --','Zahlensysteme', 'Spezielle Zahlen', 'Zahlenmengen', 'Sonstiges'], 
    ['-- Wähle bitte eine Unterkategorie --','Rechenarten', 'Gleichungen und Ungleichungen', 'Funktionen', 'Sonstiges'],
    ['-- Wähle bitte eine Unterkategorie --','Allgemeine Geometrie der Ebene', 'Trigonometrie', 'Allgemeine Geometrie des Raums', 'Vektorgeometrie', 'Sonstiges'],
    ['-- Wähle bitte eine Unterkategorie --','Grundlagen', 'Differentialrechnung', 'Integralrechnung', 'Sonstiges'],
    ['-- Wähle bitte eine Unterkategorie --','Wahrscheinlichkeitstheorie', 'Kombinatorik', 'Statistik', 'Sonstiges'],
    ['-- Wähle bitte eine Unterkategorie --','Komplexe Zahlen', 'Kegelschnitte', 'Differentialgleichungen', 'Lineare Abbildungen und Matrizen', 'Graphentheorie', 'Sonstiges']] 

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(subcategories[0][0]);

    



    



    // selectedCategory.value = categories[0];
    // selectedSubcategory.value =  subcategories[0][0];

    // console.log(selectedCategory)
    // console.log(selectedSubcategory.value)


    useEffect(() => {
        setSelectedSubcategory(subcategories[categories.indexOf(selectedCategory)][0]);
    }, [selectedCategory]);


    
    const addNewEx = async (e) => {
        e.preventDefault()
        const exWithCategory = {
            ...ex,
            category: selectedCategory,
            subcategory: selectedSubcategory
        };
        const res = await askServer("/api/ex","POST",ex)
        console.log(res)
        if (res.err) {
            console.log(res.err)
        }
        else {
            setEx({
                summary: '',
                content:'',
                solution:''
            });
            console.log("exercise added")
        }
    }

    const updateExHandler = (e) => {
        const { name, value } = e.target;
        setEx((prevEx) => ({
            ...prevEx,
            [name]: value
        }));
    };

    return (
        <>
        <form className="pure-form pure-form-aligned" onSubmit={(e) => addNewEx(e)}>
            <legend>Füge deine eigene Aufgabe hinzu</legend>
            <fieldset>
            <div className="pure-control-group">
                <label htmlFor="category">Kategorie: </label>
            <select name="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
            </select>
            </div>
            <div className="pure-control-group">
            <label htmlFor="subcategory">Unterkategorie: </label>
            <select name="subcategory" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
                {subcategories[categories.indexOf(selectedCategory)].map((subcategory, index) => <option key={index} value={subcategory}>{subcategory}</option>)}
            </select>
            </div>
            <div className="pure-control-group">
                <label htmlFor="content">Aufgabentext: </label>
                    <textarea rows="5" cols="100" name="content" id="content" value={ex.content} onChange={updateExHandler} placeholder="Schreibe deine Aufgabe im LaTeX Format"/>
            </div>
            <div className="pure-control-group">
            <label htmlFor="solution">Lösung: </label>
                <textarea rows="5" cols="100" name="solution" id="solution" value={ex.solution} onChange={updateExHandler} placeholder="Schreibe deine Lösung im LaTeX Format"/>
            </div>
            <div className="pure-controls">
                <button type="submit" className="pure-button pure-button-primary">Add new exercise</button>
            </div>
            </fieldset>
        </form>
        </>
    )


}