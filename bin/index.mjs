#! /usr/bin/env node
import groupBy from "object.groupby";
import { pino } from "pino";
const ENVIRONEMENT_VARS = {
    // Note: should be provided as an object with the same key/value pair
    SCOPES: process.env.SCOPES,
    PREVIOUS_TAG_SHA: process.env.PREVIOUS_TAG_SHA,
    CURRENT_TAG_SHA: process.env.CURRENT_TAG_SHA,
    CI_COMMIT_TAG: process.env.CI_COMMIT_TAG,
    GIT_PROJECT_API: process.env.GIT_PROJECT_API,
    GIT_TOKEN: process.env.GIT_TOKEN,
    GIT_PROJECT_URL: process.env.GIT_PROJECT_URL,
    CLICK_UP_WORKSPACE_ID: process.env.CLICK_UP_WORKSPACE_ID,
    CLICK_UP_DOC_ID: process.env.CLICK_UP_DOC_ID,
    CLICK_UP_TOKEN: process.env.CLICK_UP_TOKEN,
    DISCORD_HOOK: process.env.DISCORD_HOOK,
    DISCORD_PROJECT_IMG: process.env.DISCORD_PROJECT_IMG,
    DISCORD_PROJECT_COLOR_DIGIT: process.env.DISCORD_PROJECT_COLOR_DIGIT ?? 2646246,
    DISCORD_NAME: process.env.DISCORD_NAME || "پیشی جان",
    DISCORD_AVATAR: process.env.DISCORD_AVATAR || "https://cataas.com/cat",
};
const ALLOWED_SCOPES = ENVIRONEMENT_VARS?.SCOPES ?? {
    build: "build",
    ci: "ci",
    docs: "docs",
    feat: "feat",
    fix: "fix",
    perf: "perf",
    refactor: "refactor",
    test: "test",
};
export const logger = pino(); // biome-ignore lint/suspicious/noExplicitAny: will work on this later :)
export const errHandler = (error, from, args) => logger.error(error, { from, args });
async function upload(result) {
    logger.info("uploading to git wiki");
    await fetch(`${ENVIRONEMENT_VARS.GIT_PROJECT_API}/wikis/ChangeLogs`, {
        method: "PUT",
        headers: {
            "PRIVATE-TOKEN": `${ENVIRONEMENT_VARS.GIT_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: `{"content":${result}}`,
    })
        .then(async (res) => {
        logger.info(res.status);
    })
        .catch(async (err) => {
        logger.error(err);
    })
        .finally(() => {
        logger.info("done ✅");
    });
}
const generateScopes = (commits) => {
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
const getCommits = async () => {
    try {
        const url = `${ENVIRONEMENT_VARS.GIT_PROJECT_API}/repository/compare?from=${ENVIRONEMENT_VARS.PREVIOUS_TAG_SHA}&to=${ENVIRONEMENT_VARS.CURRENT_TAG_SHA}`;
        const gitInfo = await fetch(url, {
            headers: {
                "PRIVATE-TOKEN": `${ENVIRONEMENT_VARS.GIT_TOKEN}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const commits = (await gitInfo.json()).commits;
        if (!commits) {
            throw new Error("no commits, check envs related to git");
        }
        return commits;
    }
    catch (error) {
        errHandler(error, "getCommits");
    }
    return undefined;
};
const sendDiscordWebHook = async (body) => {
    try {
        logger.info("message to discord");
        if (!ENVIRONEMENT_VARS.DISCORD_HOOK) {
            return logger.error("No discord hook found");
        }
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const res = await fetch(ENVIRONEMENT_VARS.DISCORD_HOOK, {
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
    if (!ENVIRONEMENT_VARS.DISCORD_PROJECT_IMG ||
        !ENVIRONEMENT_VARS.DISCORD_PROJECT_COLOR_DIGIT) {
        logger.info("please provide `DISCORD_PROJECT_IMG` and `DISCORD_PROJECT_COLOR_DIGIT` envs");
    }
    const avatar_url = ENVIRONEMENT_VARS.DISCORD_AVATAR;
    const username = ENVIRONEMENT_VARS.DISCORD_NAME;
    const projectWikiURL = `${ENVIRONEMENT_VARS.GIT_PROJECT_URL}/-/wikis/ChangeLogs`;
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
                color: ENVIRONEMENT_VARS.DISCORD_PROJECT_COLOR_DIGIT,
                thumbnail: {
                    url: ENVIRONEMENT_VARS.DISCORD_PROJECT_IMG,
                },
                description: "",
            },
        ],
    };
};
const uploadToDiscord = async (markdown) => {
    try {
        if (!ENVIRONEMENT_VARS.DISCORD_HOOK) {
            throw new Error("provid DISCORD_HOOK env");
        }
        const limitedMarkdown = markdown.substring(0, 2900);
        const message = generateBasicDiscordMessage();
        message.embeds[0].description = `${limitedMarkdown}\n\n [**برای مشاهده کامل تغییرات کلیک کنید**](${message.embeds[0].author.url})\n`;
        await sendDiscordWebHook(JSON.stringify(message));
    }
    catch (error) {
        errHandler(error, "uploadToDiscord");
        return;
    }
};
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
            return `- see [${item}](https://app.clickup.com/t/${ENVIRONEMENT_VARS.CLICK_UP_WORKSPACE_ID}/${item})`;
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
        const oldData = await fetch(`${ENVIRONEMENT_VARS.GIT_PROJECT_API}/wikis/ChangeLogs`, {
            headers: {
                "PRIVATE-TOKEN": `${ENVIRONEMENT_VARS.GIT_TOKEN}`,
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
    const workspaceId = ENVIRONEMENT_VARS.CLICK_UP_WORKSPACE_ID;
    const docId = ENVIRONEMENT_VARS.CLICK_UP_DOC_ID;
    const clickupToken = ENVIRONEMENT_VARS.CLICK_UP_TOKEN;
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
        if (!ENVIRONEMENT_VARS.GIT_PROJECT_API ||
            !ENVIRONEMENT_VARS.GIT_PROJECT_URL ||
            !ENVIRONEMENT_VARS.GIT_TOKEN) {
            throw new Error("set all these envs GIT_PROJECT_API | GIT_PROJECT_URL |  GIT_TOKEN ");
        }
        const Title = `# ${ENVIRONEMENT_VARS.CI_COMMIT_TAG ?? "NO TAG"}\n`;
        const commits = await getCommits();
        if (!commits?.length) {
            logger.error("NO commits");
            return;
        }
        const scopes = generateScopes(commits);
        const gitBody = await generateH2s(scopes);
        const discordMarkdown = `${Title}${gitBody}`;
        if (ENVIRONEMENT_VARS.DISCORD_HOOK) {
            await uploadToDiscord(discordMarkdown);
        }
        if (ENVIRONEMENT_VARS.CLICK_UP_TOKEN) {
            await uploadClickUpDoc(Title, gitBody);
        }
    }
    catch (error) {
        errHandler(error, "main");
    }
};
await main();
