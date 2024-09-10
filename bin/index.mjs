#! /usr/bin/env node
import groupBy from "object.groupby";
import { pino } from "pino";
export const logger = pino();
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const errHandler = (error, from, args) => logger.error(error, { from, args });
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
    }
    catch (error) {
        errHandler(error, "generateScopes");
    }
    return undefined;
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
        logger.info(url);
        const commits = (await gitInfo.json()).commits;
        if (!commits) {
            throw new Error(`no commits, check ${JSON.stringify({
                url,
                token: process.env.GIT_TOKEN,
                gitInfo,
            })}`);
        }
        return commits;
    }
    catch (error) {
        errHandler(error, "getCommits");
    }
    return undefined;
};
/**
 *
 * @param {*} body this should be a stringified json @see https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html
 */
const sendDiscordWebHook = async (body) => {
    try {
        logger.info("message to discord");
        if (!process.env.DISCORD_HOOK) {
            return logger.error("No discord hook found");
        }
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const res = await fetch(process.env.DISCORD_HOOK, {
            body,
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        logger.info(`discord message status: ${res.statusText}`);
        return res;
    }
    catch (error) {
        errHandler(error);
    }
};
const generateBasicDiscordMessage = () => {
    if (!process.env.DISCORD_PROJECT_IMG ||
        !process.env.DISCORD_PROJECT_COLOR_DIGIT) {
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
                    url: process.env?.DISCORD_PROJECT_IMG ??
                        "https://panel.iranicard.ir/icons/icon-512x512.png",
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
const uploadToDiscord = async (markdown) => {
    try {
        if (!process.env.DISCORD_HOOK) {
            throw new Error("provid DISCORD_HOOK env");
        }
        const limitedMarkdown = markdown.substring(0, 2900);
        const message = generateBasicDiscordMessage();
        message.embeds[0].description = `${limitedMarkdown}\n\n [**برای مشاهده کامل تغییرات کلیک کنید**](${message.embeds[0].author.url})\n`;
        await sendDiscordWebHook(JSON.stringify(message));
    }
    catch (error) {
        errHandler(error, "uploadToDiscord");
    }
};
/**
 * @description let's make it markdown only
 * @param {commitsWithJira} commit
 *
 */
const generateMarkDown = (commit) => {
    const indent = "    ";
    const gitAuthor = `- Author: *${commit.author_name}*`;
    const gitTitle = `- **${commit.title}**\n${indent}${gitAuthor}\n`;
    const splitedTitle = commit.title.split("|");
    const details = process.env.CLICK_UP_WORKSPACE_ID && splitedTitle.length > 1
        ? splitedTitle
            .at(-1)
            ?.replace(/\s+/g, "")
            .split("#")
            .filter((item) => item.length > 1)
            .map((item) => {
            return `- see [${item}](https://app.clickup.com/t/${process.env.CLICK_UP_WORKSPACE_ID}/${item})`;
        })
            .join(`${indent}`)
        : "";
    return `${gitTitle}${details ? `\n${indent}${details}` : ""}`;
};
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const generateH2 = async (commits, type) => {
    const size = commits.length;
    const title = `## ${type} | total: ${size}\n`;
    let allRelatedCommits = "";
    for (const commit of commits) {
        allRelatedCommits += `${generateMarkDown(commit)}\n`;
    }
    return `${title}${allRelatedCommits}
`;
};
const generateH2s = async (commits) => {
    let result = "";
    for (const item in commits) {
        result += `${await generateH2(commits[item], item)} `;
    }
    return result;
};
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const _uploadToGit = async (markdown) => {
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
    }
    catch (error) {
        errHandler(error, "uploadToGit");
    }
};
// clickUp
export const uploadClickUpDoc = async (name, content) => {
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
        if (!process.env.GIT_PROJECT_API ||
            !process.env.GIT_PROJECT_URL ||
            !process.env.GIT_TOKEN) {
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
        const discordMarkdown = `${Title}${gitBody}`;
        await uploadClickUpDoc(Title, gitBody);
        await uploadToDiscord(discordMarkdown);
    }
    catch (error) {
        errHandler(error, "main");
    }
};
await main();
