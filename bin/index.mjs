#! /usr/bin/env node
import groupBy from "object.groupby";
import pino from "pino";
import showDown from "showdown";
import { JSDOM } from "jsdom";
globalThis.window = new JSDOM("", {}).window;

const converter = new showDown.Converter();

const errHandler = (error, from, args) => logger.error(error, { from, args });

/**
 *  @typedef {object} commits
 * @property {string} id
 * @property {string} short_id
 * @property {string} created_at
 * @property {string[]} parent_ids
 * @property {string} title
 * @property {string} message
 * @property {string} author_name
 * @property {string} author_email
 * @property {string} authored_date
 * @property {string} committer_name
 * @property {string} committer_email
 * @property {string} committed_date
 * @property {string} web_url
 *
 */

/**
 * @typedef {object} jiraInfo
 * @property {string} expand
 * @property {string} id
 * @property {string} self
 * @property {string} key
 * @property {object} fields
 * @property {string} fields.summary
 * @property {null} fields.description
 * @property {string} fields.identifier
 */

/**
 * @extends commits
 * @typedef {{jiraInfo?:jiraInfo[]} & commits} commitsWithJira
 */
/**
 * @typedef {Object.<string, commitsWithJira[]>} scopedCommits
 */

const logger = pino();
async function upload(result) {
  logger.info("uploading to git wiki");
  await fetch(`${process.env.GIT_PROJECT_API}/wikis/ChangeLogs`, {
    method: "PUT",
    headers: {
      "PRIVATE-TOKEN": `${process.env.GIT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: `{"content":${result}}`,
  })
    .then(async (res) => {
      logger.info(res.status);
    })
    .catch(async (err) => {
      logger.info(err);
    })
    .finally(() => {
      logger.info("done ✅");
    });
}
const getJiraInfo = async (jiraIdentifier) => {
  try {
    const res = await fetch(
      `${process.env.JIRA_SERVER}/rest/api/latest/issue/${jiraIdentifier}?fields=summary,description
`,
      {
        headers: {
          Authorization: `Bearer  ${process.env.JIRA_TOKEN}`,
        },
        method: "get",
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    errHandler(error, "getJiraInfo", jiraIdentifier);
  }
};

/**
 *
 * @param {commits[]} commits
 * @returns {scopedCommits} using angular conventions
 */
const generateScopes = (commits) => {
  const ALLOWED_SCOPES = {
    build: "build",
    ci: "ci",
    docs: "docs",
    feat: "feat",
    fix: "fix",
    perf: "perf",
    refactor: "refactor",
    test: "test",
  };
  try {
    const sorted = groupBy(commits, ({ title }) => {
      const scope = title.split(":")[0].split("(")[0].trim().toLowerCase();
      return ALLOWED_SCOPES[scope] ?? "NO_SCOPE";
    });
    return sorted;
  } catch (error) {
    errHandler(error, "generateScopes");
  }
};

/**
 *
 * @returns {Promise<commits[]>} all related git commits
 */
const getCommits = async () => {
  try {
    const url = `${process.env.GIT_PROJECT_API}/repository/compare?from=${process.env.PREVIOUS_TAG_SHA}&to=${process.env.CURRENT_TAG_SHA}`;
    const gitInfo = await fetch(url, {
      headers: {
        "PRIVATE-TOKEN": `${process.env.GIT_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const commits = (await gitInfo.json())["commits"];
    if (!commits) {
      throw new Error(
        `no commits, check ${JSON.stringify({
          url,
          token: process.env.GIT_TOKEN,
          gitInfo,
        })}`
      );
    }
    return commits;
  } catch (error) {
    errHandler(error, "getCommits");
  }
};

/**
 * @param {string} commitTitle
 * @returns {{title:string,numbers:Number[]}}
 */
const parseJiraTasks = (commitTitle) => {
  const [title, ...unsanitizedNumbers] = commitTitle
    .toLowerCase()
    .split("resolves")[1]
    .trim()
    .replaceAll(" ", "")
    .split("-");

  const numbers = unsanitizedNumbers.map((x) => x.replace(title, "").trim());
  return {
    title,
    numbers,
  };
};
/**
 * @param {commits} commit
 * @returns {Promise<commitsWithJira>} commit with jira info
 */
const parseJiraInfo = async (commit) => {
  try {
    const { numbers, title } = parseJiraTasks(commit.title);
    let jiraInfo = [];
    for await (const item of numbers) {
      if (Number(item)) {
        const jiraIdentifier = `${title}-${item}`;
        /**
         * @type {jiraInfo}
         */
        const jira = await getJiraInfo(jiraIdentifier);
        if (jira.fields) {
          jira.fields["identifier"] = jiraIdentifier;
          jira.fields.summary = jira.fields?.summary
            ? converter.makeMarkdown(jira.fields.summary)
            : null;
          jira.fields["description"] = jira.fields?.description
            ? converter.makeMarkdown(jira.fields.description)
            : null;
          jiraInfo.push(jira);
        }
      }
    }
    return {
      ...commit,
      jiraInfo,
    };
  } catch (error) {
    errHandler(error, "parseJiraInfo", commit);
  }
};

/**
 *
 * @param {commits[]} commits
 * @return  {Promise<commitsWithJira[]>} commits enhanced with jira info
 */
const addJiraInfo = async (commits) => {
  const useJira = process.env.JIRA_SERVER && process.env.JIRA_TOKEN;
  try {
    let newCommits = [];
    for await (const item of commits) {
      const hasJira = item.title.toLowerCase()?.split("resolves")?.[1] ?? null;
      if (hasJira && useJira) {
        const withJiraInfo = await parseJiraInfo(item);
        newCommits.push(withJiraInfo);
      } else {
        newCommits.push(item);
      }
    }
    return newCommits;
  } catch (error) {
    errHandler(error, "addJiraInfo");
  }
};

/**
 *
 * @param {*} body this should be a stringified json @see https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html
 */
const sendDiscordWebHook = async (body) => {
  try {
    logger.info("message to discord");
    const res = await fetch(process.env.DISCORD_HOOK, {
      body,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    logger.info(`discord message status: ${res.statusText}`);
    return res;
  } catch (error) {
    errHandler(error);
  }
};
const generateBasicDiscordMessage = () => {
  if (
    !process.env.DISCORD_PROJECT_IMG ||
    !process.env.DISCORD_PROJECT_COLOR_DIGIT
  ) {
    logger.info(
      "please provide `DISCORD_PROJECT_IMG` and `DISCORD_PROJECT_COLOR_DIGIT` envs"
    );
  }
  const avatar_url = "https://cataas.com/cat";
  const username = "پیشی جان";
  const projectWikiURL = `${process.env.GIT_PROJECT_URL}/-/wikis/ChangeLogs`;
  return {
    username,
    avatar_url,
    embeds: [
      {
        author: {
          name: " برای مشاهده تمام تغییرات کلیک کنید",
          icon_url: avatar_url,
          // TODO replace icon_url with an env
          url: projectWikiURL,
        },
        color: process.env?.DISCORD_PROJECT_COLOR_DIGIT ?? 2646246,
        thumbnail: {
          url:
            process.env?.DISCORD_PROJECT_IMG ??
            "https://panel.iranicard.ir/icons/icon-512x512.png",
        },
      },
    ],
  };
};

/**
 *
 * @param {string} markdown
 */
const uploadToDiscord = async (markdown) => {
  try {
    if (!process.env.DISCORD_HOOK) {
      throw new Error("provid DISCORD_HOOK env");
    }
    const limitedMarkdown = markdown.substring(0, 2900);
    const message = generateBasicDiscordMessage();
    message.embeds[0][
      "description"
    ] = `${limitedMarkdown}\n\n [**برای مشاهده کامل تغییرات کلیک کنید**](${message.embeds[0].author.url})\n`;
    await sendDiscordWebHook(JSON.stringify(message));
  } catch (error) {
    errHandler(error, "uploadToDiscord");
  }
};

/**
 * @description let's make it markdown only
 * @param {commitsWithJira} commit
 *
 */
const generateMarkDown = (commit, addDesc = true) => {
  const indent = "    ";
  const gitAuthor = `- Author: *${commit.author_name}*`;
  const gitTitle = `- **${commit.title}**\n${indent}${gitAuthor}\n`;
  const details = commit?.jiraInfo?.length
    ? commit.jiraInfo
        .map((x) => generateJiraMarkdown(x, addDesc))
        .join(`\n${indent}`)
    : "";
  return `${gitTitle}${details ? `\n${indent}${details}\n` : ""}`;
};

/**
 *
 * @param {jiraInfo} jiraInfo
 * @returns {string} jira Details markdown
 */
const generateJiraMarkdown = (jiraInfo, addDescription = true) => {
  const description = jiraInfo.fields?.description ?? "";
  const jiraDetails =
    description && addDescription
      ? `<details><summary>${jiraInfo.fields.summary} |  [مشاهده تسک در جیرا](https://task.paliz.org/browse/${jiraInfo.fields.identifier})</summary> ${description} </details>`
      : `${jiraInfo.fields.summary} |  [مشاهده تسک در جیرا](https://task.paliz.org/browse/${jiraInfo.fields.identifier})`;

  return converter.makeMarkdown(jiraDetails);
};

const generateH2 = async (commits, type, addDesc = true) => {
  const size = commits.length;
  const title = `## ${type} | (${size})\n`;
  let allRelatedCommits = ``;
  for (const commit of commits) {
    allRelatedCommits += `${await generateMarkDown(commit, addDesc)}\n`;
  }
  return `${title}${allRelatedCommits}
`;
};

const generateH2s = async (commits, addDesc = true) => {
  let result = ``;
  for (const item in commits) {
    result += `${await generateH2(commits[item], item, addDesc)} `;
  }
  return result;
};

const uploadToGit = async (markdown) => {
  try {
    const oldData = await fetch(
      `${process.env.GIT_PROJECT_API}/wikis/ChangeLogs`,
      {
        headers: {
          "PRIVATE-TOKEN": `${process.env.GIT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const oldContent = (await oldData.json()).content;
    const uploadData = `${markdown}\n\n${oldContent}`;
    await upload(JSON.stringify(uploadData));
  } catch (error) {
    errHandler(error, "uploadToGit");
  }
};

const main = async () => {
  try {
    if (
      !process.env.GIT_PROJECT_API ||
      !process.env.GIT_PROJECT_URL ||
      !process.env.GIT_TOKEN
    ) {
      throw new Error(
        "set all these envs GIT_PROJECT_API | GIT_PROJECT_URL |  GIT_TOKEN "
      );
    }
    const useJira = process.env.JIRA_SERVER && process.env.JIRA_TOKEN;
    if (!useJira) {
      errHandler("no JIRA_TOKEN || JIRA_SERVER env");
    }
    const Title = `# ${process.env.CI_COMMIT_TAG ?? "NO TAG"}\n`;
    let commits = await getCommits();
    if (useJira) {
      commits = await addJiraInfo(commits);
    }
    const scopes = generateScopes(commits);
    const gitBody = await generateH2s(scopes);
    const discordBody = await generateH2s(scopes, false);
    const gitMarkdown = `${Title}${gitBody}`;
    const discordMarkdown = `${Title}${discordBody}`;
    await uploadToGit(gitMarkdown);
    await uploadToDiscord(discordMarkdown);
  } catch (error) {
    errHandler(error, "main");
  }
};

await main();
