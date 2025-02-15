import { ResolvedChangelogConfig } from "./config";
import { GitCommit } from "./git";

export interface JiraResponse {
  id: string;
  key: string;
  fields: {
    summary: string;
    description: string;
  };
}
export const getJiraInfo = async (
  jiraIdentifier: string,
  jiraToken: string,
  jiraServer: string
) => {
  try {
    const res = await fetch(
      `${jiraServer}/rest/api/latest/issue/${jiraIdentifier}?fields=summary,description`,
      {
        headers: {
          Authorization: `Bearer  ${jiraToken}`,
        },
        method: "get",
      }
    );
    const result = await res.json() as Awaited<JiraResponse>;

    return result;
  } catch  {
    throw new Error("getJiraInfo", {
      cause: jiraIdentifier,
    });
  }
};




const extractJiraId = (commit: string) => {
  return commit
    .split("|")
    .slice(1)
    .map((x) => x.trim())
    .filter(Boolean);
};

export async function getJiraDetails(
  commits: GitCommit[],
  config: ResolvedChangelogConfig
) {
  const _jiraWithDuplicateIssues = new Array<string>();
  commits.map((commit) => {
    const id = extractJiraId(commit.description);
    _jiraWithDuplicateIssues.push(...id);
  });
  const _jiraIssues = new Set(_jiraWithDuplicateIssues);
  const _jiraIssuesWithInfo = new Map<string, JiraResponse>();
  for (const issue of _jiraIssues) {
    const info = await getJiraInfo(
      issue,
      config.jira.token,
      config.jira.serverUrl
    );
    _jiraIssuesWithInfo.set(issue, info);
  }
  const jiraIssues = [..._jiraIssuesWithInfo.entries()].map((e) => ({
    name: e[0],
    ...e[1],
  }));
  return jiraIssues;
}
