import * as fs from "node:fs";
import * as path from "node:path";
const directory = path.resolve(__dirname, "dist"); // Assuming 'dist' is your outDir
function renameFiles(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            renameFiles(fullPath); // Recursively rename in subdirectories
        }
        else if (path.extname(fullPath) === ".js") {
            const newFilePath = `${fullPath.slice(0, -3)}.mjs`;
            fs.renameSync(fullPath, newFilePath);
        }
    });
}
renameFiles(directory);
