// needed to use fs/promises to write to file otherwise downloaded file was empty
const fsp = require("node:fs/promises");
const fs = require("node:fs");

/**
 * Schreibe JSON in eine Datei
 * @param {Array} json - JSON-Array
 */

async function fileWriter(json) {
    let success = true;
    console.log("Writing to file");
    console.log(json);
    await fsp.writeFile(
        "/home/node/server/output/output.txt",
        JSON.stringify(json),
        (err) => {
            if (err) {
            console.log("CONTROLLER:","Error writing to file:", err);
            success = false;
            } else {
            console.log("CONTROLLER: Data written to file successfully");
            }
    });
    return success;
}

/**
 * Schreibe LaTeX-Datei aus den übergebenen Übungen
 * @param {Array} exercises - Array mit den Übungen
 */

async function writeLatex(exercises) {
    let latexContent = `
    \\documentclass{article}
    \\usepackage{enumitem}
    \\begin{document}
    
    \\section*{Exercises}
    \\begin{enumerate}[label=\\arabic*.]
    `;
    
        exercises.forEach((exercise, index) => {
            latexContent += `
        \\item ${exercise.content}
    `;
        });
    
        latexContent += `
    \\end{enumerate}
    
    \\section*{Solutions}
    \\begin{enumerate}[label=\\arabic*.]
    `;
    
        exercises.forEach((exercise, index) => {
            latexContent += `
        \\item ${exercise.solution}
    `;
        });
    
        latexContent += `
    \\end{enumerate}
    \\end{document}
    `;

    await fsp.writeFile(
        "/home/node/server/output/myExercises.tex",
        latexContent,
        (err) => {
            if (err) {
            console.error("Error writing to file:", err);
            res.json({ msg: "Error writing to file", err: err });
            } else {
            console.log("Data written to file successfully");
            }
    });
}

module.exports = {
    fileWriter: fileWriter,
    writeLatex: writeLatex,
};