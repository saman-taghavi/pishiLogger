import consola from "consola";
import type { Argv } from "mri";
import { existsSync, promises as fsp } from "node:fs";
import { resolve } from "pathe";
import {
  getCurrentGitStatus,
  getGitDiff,
  loadChangelogConfig,
  parseCommits,
} from "..";
import { generateMarkDown } from "../gitlab";

export default async function gitlabMain(args: Argv) {
  const cwd = resolve(args._[0] /* bw compat */ || args.dir || "");
  process.chdir(cwd);
  consola.wrapConsole();

  const config = await loadChangelogConfig(cwd, {
    from: args.from,
    to: args.to,
    output: args.output,
    newVersion: typeof args.r === "string" ? args.r : undefined,
  });

  if (args.clean) {
    const dirty = await getCurrentGitStatus();
    if (dirty) {
      consola.error("Working directory is not clean.");
      process.exit(1);
    }
  }

  const logger = consola.create({ stdout: process.stderr });
  logger.info(`Generating changelog for ${config.from || ""}...${config.to}`);

  const rawCommits = await getGitDiff(config.from, config.to);
  // Parse commits as our conventional commits
  const commits = parseCommits(rawCommits, config)
    .map((c) => ({ ...c, type: c.type.toLowerCase() /* #198 */ }))


  logger.info(JSON.stringify(commits,undefined,3))
  // Generate markdown
  const markdown = await generateMarkDown(commits, config);
  // Show changelog in CLI unless bumping or releasing
  const displayOnly = !args.bump && !args.release;
  if (displayOnly) {
    consola.log("\n\n" + markdown + "\n\n");
  }

  // Update changelog file (only when bumping or releasing or when --output is specified as a file)
  if (typeof config.output === "string" && (args.output || !displayOnly)) {
    let changelogMD: string;
    if (existsSync(config.output)) {
      consola.info(`Updating ${config.output}`);
      changelogMD = await fsp.readFile(config.output, "utf8");
    } else {
      consola.info(`Creating  ${config.output}`);
      changelogMD = "# Changelog\n\n";
    }

    const lastEntry = changelogMD.match(/^###?\s+.*$/m);

    if (lastEntry) {
      changelogMD =
        changelogMD.slice(0, lastEntry.index) +
        markdown +
        "\n\n" +
        changelogMD.slice(lastEntry.index);
    } else {
      changelogMD += "\n" + markdown + "\n\n";
    }

    await fsp.writeFile(config.output, changelogMD);
  }

  // TODO upload the file to gitlab wiki
  // TODO upload the file to mattermost
}
