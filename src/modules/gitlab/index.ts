import { convert } from "convert-gitmoji";
import { fetch } from "node-fetch-native";
import { upperFirst } from "scule";
import type { ResolvedChangelogConfig } from "../../config";
import { getCurrentGitBranch, type GitCommit, type Reference } from "../../git";
import { getJiraDetails } from "../../jira";
import { formatCompareChanges, formatReference } from "../../repo";

export async function generateMarkDown(
  commits: GitCommit[],
  config: ResolvedChangelogConfig
) {
  const typeGroups = groupBy(commits, "type");

  const markdown: string[] = [];
  const breakingChanges = [];

  // Version Title
  const v = config.newVersion && `v${config.newVersion}`;
  const lastTagOrBranchName = config.to ?? getCurrentGitBranch();
  markdown.push(
    "",
    "## " + (v || `${config.from || ""}...${lastTagOrBranchName}`),
    ""
  );

  if (config.repo && config.from) {
    markdown.push(formatCompareChanges(v, config));
  }

  for (const type in config.types) {
    const group = typeGroups[type];
    if (!group || group.length === 0) {
      continue;
    }

    markdown.push("", "### " + config.types[type].title, "");
    for (const commit of group.reverse()) {
      const line = formatCommit(commit, config);
      markdown.push(line);
      if (commit.isBreaking) {
        breakingChanges.push(line);
      }
    }
  }

  if (breakingChanges.length > 0) {
    markdown.push("", "#### ⚠️ Breaking Changes", "", ...breakingChanges);
  }

  if (config.jira.token) {
    const jiraIssues = await getJiraDetails(commits, config);
    if (jiraIssues.length > 0) {
      markdown.push(
        "",
        "### " + "🎯🪛🔧 Related Jira Issues Info",
        "",
        ...jiraIssues.map((i) => {
          return `-   ${i.key} | ${i?.fields?.summary ?? ""}`;
        })
      );
    }
  }

  const _authors = new Map<string, { email: Set<string>; github?: string }>();
  for (const commit of commits) {
    if (!commit.author) {
      continue;
    }
    const name = formatName(commit.author.name);
    if (!name || name.includes("[bot]")) {
      continue;
    }
    if (
      config.excludeAuthors &&
      config.excludeAuthors.some(
        (v) => name.includes(v) || commit.author.email?.includes(v)
      )
    ) {
      continue;
    }
    if (_authors.has(name)) {
      const entry = _authors.get(name);
      entry.email.add(commit.author.email);
    } else {
      _authors.set(name, { email: new Set([commit.author.email]) });
    }
  }

  const authors = [..._authors.entries()].map((e) => ({ name: e[0], ...e[1] }));

  if (authors.length > 0) {
    markdown.push(
      "",
      "### " + "❤️ Contributors",
      "",
      ...authors.map((i) => {
        return `- ${i.name}`;
      })
    );
  }

  return convert(markdown.join("\n").trim(), true);
}

export function parseChangelogMarkdown(contents: string) {
  const headings = [...contents.matchAll(CHANGELOG_RELEASE_HEAD_RE)];
  const releases: { version?: string; body: string }[] = [];

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const nextHeading = headings[i + 1];
    const [, title] = heading;
    const version = title.match(VERSION_RE);
    const release = {
      version: version ? version[1] : undefined,
      body: contents
        .slice(
          heading.index + heading[0].length,
          nextHeading?.index ?? contents.length
        )
        .trim(),
    };
    releases.push(release);
  }

  return {
    releases,
  };
}

// --- Internal utils ---

function formatCommit(commit: GitCommit, config: ResolvedChangelogConfig) {
  return (
    "- " +
    (commit.scope ? `**${commit.scope.trim()}:** ` : "") +
    (commit.isBreaking ? "⚠️  " : "") +
    upperFirst(commit.description) +
    formatReferences(commit.references, config)
  );
}

function formatReferences(
  references: Reference[],
  config: ResolvedChangelogConfig
) {
  const pr = references.filter((ref) => ref.type === "pull-request");
  const issue = references.filter((ref) => ref.type === "issue");
  if (pr.length > 0 || issue.length > 0) {
    return (
      " (" +
      [...pr, ...issue]
        .map((ref) => formatReference(ref, config.repo))
        .join(", ") +
      ")"
    );
  }
  if (references.length > 0) {
    return " (" + formatReference(references[0], config.repo) + ")";
  }
  return "";
}

function formatName(name = "") {
  return name
    .split(" ")
    .map((p) => upperFirst(p.trim()))
    .join(" ");
}

function groupBy(items: any[], key: string) {
  const groups = {};
  for (const item of items) {
    groups[item[key]] = groups[item[key]] || [];
    groups[item[key]].push(item);
  }
  return groups;
}

const CHANGELOG_RELEASE_HEAD_RE = /^#{2,}\s+.*(v?(\d+\.\d+\.\d+)).*$/gm;
const VERSION_RE = /^v?(\d+\.\d+\.\d+)$/;

export const publishGitlabWiki = async (
  content: string,
  title: string,
  config: ResolvedChangelogConfig
) => {
  try {
    const res = await fetch(
      `${config.provider.gitlab.CI_API_V4_URL}/projects/${config.provider.gitlab.CI_PROJECT_ID}/wikis`,
      {
        headers: {
          "PRIVATE-TOKEN": `${config.tokens.gitlab}`,
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          format: "markdown",
          title,
          content,
        }),
      }
    );
    if (res.status === 400) {
      const updateRes = await fetch(
        `${config.provider.gitlab.CI_API_V4_URL}/projects/${config.provider.gitlab.CI_PROJECT_ID}/wikis/${encodeURIComponent(title)}`,
        {
          headers: {
            "PRIVATE-TOKEN": `${config.tokens.gitlab}`,
            "Content-Type": "application/json",
          },
          method: "put",
          body: JSON.stringify({
            format: "markdown",
            title,
            content,
          }),
        }
      );
      return await updateRes.json();
    }

    return await res.json();
  } catch (error) {
    throw new Error("publishGitlabWiki", {
      cause: error,
    });
  }
};
