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
import { generateMarkDown, publishGitlabWiki } from "../modules/gitlab";
import { sendToMatteMost } from "../modules/mattermost";

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
  const commits = parseCommits(rawCommits, config).map((c) => ({
    ...c,
    type: c.type.toLowerCase() /* #198 */,
  }));

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
    consola.info(`Creating  ${config.output}`);
    changelogMD = "# Changelog\n\n";
    changelogMD += "\n" + markdown + "\n\n";
    await fsp.writeFile(config.output, changelogMD);
  }
  // TODO upload the file to gitlab wiki
  const title = `${config.from || ""}...${config.to}`.replaceAll("/", "-");
  if (config.tokens.gitlab) {
    logger.info(`updating wiki with ${title}`);
    const res = await publishGitlabWiki(markdown, title, config);
    logger.info(`wiki update result,${JSON.stringify(res)}`);
  }
  if (config.publisher.mattermost.username) {
    logger.info(
      `posting to mattermost with user ${config.publisher.mattermost.username}`
    );
    const res = await sendToMatteMost(markdown, title, config);

    logger.info(`mattermost update result,${JSON.stringify(res)}`);
  }
  // TODO upload the file to mattermost
}
