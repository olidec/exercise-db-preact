const fs = require("node:fs/promises");

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