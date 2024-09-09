import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const directory = path.resolve(__dirname, "../../bin"); // Assuming 'dist' is your outDir

function renameFiles(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      renameFiles(fullPath); // Recursively rename in subdirectories
    } else if (path.extname(fullPath) === ".js") {
      const newFilePath = `${fullPath.slice(0, -3)}.mjs`;
      fs.renameSync(fullPath, newFilePath);
    }
  });
}

renameFiles(directory);
