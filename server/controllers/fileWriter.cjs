// needed to use fs/promises to write to file otherwise downloaded file was empty
const fs = require("node:fs/promises");

/**
 * Schreibe JSON in eine Datei
 * @param {Array} json - JSON-Array
 */

async function fileWriter(json) {
    console.log("Writing to file");
    console.log(json);
    await fs.writeFile(
        "server/output/output.txt",
        JSON.stringify(json),
        (err) => {
            if (err) {
            console.error("Error writing to file:", err);
            res.json({ msg: "Error writing to file", err: err });
            } else {
            console.log("Data written to file successfully");
            }
    });
}

module.exports = fileWriter;