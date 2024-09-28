// needed to use fs/promises to write to file otherwise downloaded file was empty
const fsp = require("node:fs/promises");
const fs = require("node:fs");

/**
 * Schreibe JSON in eine Datei
 * @param {Array} json - JSON-Array
 */

async function fileWriter(json) {
    let success = true;
    await fsp.writeFile(
        "/home/node/server/output/output.txt",
        JSON.stringify(json),
        (err) => {
            if (err) {
            success = false;
            } else {
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
            }
    });
}

function texContent(exercises) {
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
        return latexContent;
}

module.exports = {
    fileWriter: fileWriter,
    writeLatex: writeLatex,
    texContent: texContent
};