#! /usr/bin/env node
import groupBy from "object.groupby";
import showDown from "showdown";
import { pino } from "pino";

export const logger = pino();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const errHandler = (error?: any, from?: any, args?: any) => logger.error(error, { from, args });

// TODO : add'em types
const converter = new showDown.Converter();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>

interface commits {
  id: string;
  short_id: string;
  created_at: string;
  parent_ids: string[];
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
  web_url: string;
}

interface jiraInfo {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    summary: string;
    description: null;
    identifier: string;
  };
}

type commitsWithJira = { jiraInfo?: jiraInfo[] } & commits;

type scopedCommits = Record<string, commitsWithJira[]>;

async function upload(result: string) {
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

/**
 *
 * @param {commits[]} commits
 * @returns {scopedCommits} using angular conventions
 */
const generateScopes = (commits: commits[]): scopedCommits | undefined => {
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
      return ALLOWED_SCOPES[scope as keyof typeof ALLOWED_SCOPES] ?? "NO_SCOPE";
    });
    return sorted;
  } catch (error) {
    errHandler(error, "generateScopes");
  }
  return undefined;
};

/**
 *
 * @returns {Promise<commits[]>} all related git commits
 */
const getCommits = async (): Promise<commits[] | undefined> => {
  try {
    const url = `${process.env.GIT_PROJECT_API}/repository/compare?from=${process.env.PREVIOUS_TAG_SHA}&to=${process.env.CURRENT_TAG_SHA}`;
    const gitInfo = await fetch(url, {
      headers: {
        // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
        "PRIVATE-TOKEN": `${process.env.GIT_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    logger.info(url);
    const commits = (await gitInfo.json()).commits;
    if (!commits) {
      throw new Error(
        `no commits, check ${JSON.stringify({
          url,
          token: process.env.GIT_TOKEN,
          gitInfo,
        })}`,
      );
    }
    return commits;
  } catch (error) {
    errHandler(error, "getCommits");
  }
  return undefined;
};

/**
 *
 * @param {*} body this should be a stringified json @see https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html
 */
const sendDiscordWebHook = async (body: string) => {
  try {
    logger.info("message to discord");
    if (!process.env.DISCORD_HOOK) {
      return logger.error("No discord hook found");
    }
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const res = await fetch(process.env.DISCORD_HOOK!, {
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
  if (!process.env.DISCORD_PROJECT_IMG || !process.env.DISCORD_PROJECT_COLOR_DIGIT) {
    logger.info("please provide `DISCORD_PROJECT_IMG` and `DISCORD_PROJECT_COLOR_DIGIT` envs");
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
          url: process.env?.DISCORD_PROJECT_IMG ?? "https://panel.iranicard.ir/icons/icon-512x512.png",
        },
        description: "",
      },
    ],
  };
};

/**
 *
 * @param {string} markdown
 */
const uploadToDiscord = async (markdown: string) => {
  try {
    if (!process.env.DISCORD_HOOK) {
      throw new Error("provid DISCORD_HOOK env");
    }
    const limitedMarkdown = markdown.substring(0, 2900);
    const message = generateBasicDiscordMessage();
    message.embeds[0].description = `${limitedMarkdown}\n\n [**برای مشاهده کامل تغییرات کلیک کنید**](${message.embeds[0].author.url})\n`;
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
const generateMarkDown = (commit: commitsWithJira, addDesc = true) => {
  const indent = "    ";
  const gitAuthor = `- Author: *${commit.author_name}*`;
  const gitTitle = `- **${commit.title}**\n${indent}${gitAuthor}\n`;
  const details = commit?.jiraInfo?.length
    ? commit.jiraInfo.map((x) => generateJiraMarkdown(x, addDesc)).join(`\n${indent}`)
    : "";
  return `${gitTitle}${details ? `\n${indent}${details}\n` : ""}`;
};

/**
 *
 * @param {jiraInfo} jiraInfo
 * @returns {string} jira Details markdown
 */
const generateJiraMarkdown = (jiraInfo: jiraInfo, addDescription = true): string => {
  const description = jiraInfo.fields?.description ?? "";
  const jiraDetails =
    description && addDescription
      ? `<details><summary>${jiraInfo.fields.summary} |  [مشاهده تسک در جیرا](https://task.paliz.org/browse/${jiraInfo.fields.identifier})</summary> ${description} </details>`
      : `${jiraInfo.fields.summary} |  [مشاهده تسک در جیرا](https://task.paliz.org/browse/${jiraInfo.fields.identifier})`;

  return converter.makeMarkdown(jiraDetails);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const generateH2 = async (commits: any, type: string, addDesc = true) => {
  const size = commits.length;
  const title = `## ${type} | total: ${size}\n`;
  let allRelatedCommits = "";
  for (const commit of commits) {
    allRelatedCommits += `${await generateMarkDown(commit, addDesc)}\n`;
  }
  return `${title}${allRelatedCommits}
`;
};

const generateH2s = async (commits: scopedCommits | undefined, addDesc = true) => {
  let result = "";
  for (const item in commits) {
    result += `${await generateH2(commits[item], item, addDesc)} `;
  }
  return result;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const _uploadToGit = async (markdown: any) => {
  try {
    const oldData = await fetch(`${process.env.GIT_PROJECT_API}/wikis/ChangeLogs`, {
      headers: {
        "PRIVATE-TOKEN": `${process.env.GIT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const oldContent = (await oldData.json()).content;
    const uploadData = `${markdown}\n\n${oldContent}`;
    await upload(JSON.stringify(uploadData));
  } catch (error) {
    errHandler(error, "uploadToGit");
  }
};

// clickUp

export const uploadClickUpDoc = async (name: string, content: string) => {
  const workspaceId = process.env.CLICK_UP_WORKSPACE_ID;
  const docId = process.env.CLICK_UP_DOC_ID;
  const clickupToken = process.env.CLICK_UP_TOKEN;
  if (!workspaceId || !docId || !clickupToken) {
    errHandler("INCLUDE THESE ENVs FOR CLICKUP CLICK_UP_WORKSPACE_ID ,CLICK_UP_DOC_ID,CLICK_UP_TOKEN ");
    return;
  }
  const resp = await fetch(`https://api.clickup.com/api/v3/workspaces/${workspaceId}/docs/${docId}/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: clickupToken,
    },
    body: JSON.stringify({
      parent_page_id: null,
      name,
      sub_title: null,
      content,
      content_format: "text/md",
    }),
  });
  const res = await resp.json();
  if (res.id) {
    logger.info("clickup doc uploaded! 🚀");
  }
  return res;
};

const main = async () => {
  try {
    if (!process.env.GIT_PROJECT_API || !process.env.GIT_PROJECT_URL || !process.env.GIT_TOKEN) {
      logger.info(process.env);
      logger.info(process.env.GIT_PROJECT_URL);
      logger.info(process.env.GIT_TOKEN);
      throw new Error("set all these envs GIT_PROJECT_API | GIT_PROJECT_URL |  GIT_TOKEN ");
    }

    const Title = `# ${process.env.CI_COMMIT_TAG ?? "NO TAG"}\n`;
    const commits = await getCommits();
    if (!commits?.length) {
      logger.error("NO commits");
      return;
    }
    const scopes = generateScopes(commits);
    const gitBody = await generateH2s(scopes);
    const discordBody = await generateH2s(scopes, false);
    const gitMarkdown = `${Title}${gitBody}`;
    const discordMarkdown = `${Title}${discordBody}`;
    await uploadClickUpDoc(Title, gitBody);
    await uploadToDiscord(discordMarkdown);
    logger.info(gitMarkdown);
  } catch (error) {
    errHandler(error, "main");
  }
};

await main();
