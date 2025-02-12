import { ofetch } from "ofetch";
import { ResolvedChangelogConfig } from "./config";
import { GitCommit } from "./git";
import consola, { InputLogObject } from "consola";
const logger = consola.create({ stdout: process.stderr });
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
    const res = await ofetch<JiraResponse>(
      `${jiraServer}/rest/api/latest/issue/${jiraIdentifier}?fields=summary,description`,
      {
        headers: {
          Authorization: `Bearer  ${jiraToken}`,
        },
        method: "get",
      }
    );

    return res;
  } catch {
    logger.warn({
      tag: "jira",
      message: `failed to get Jira details for  ${jiraIdentifier} from ${jiraServer}`,
      level: 2,
    } as InputLogObject);
    return;
  }
};

const extractJiraId = (commit: string) => {
  return commit
    .split("|")
    .slice(1)
    .join(" ") // Ensure all issue text is in a single string
    .split(/\s+/) // Split by any whitespace (spaces, tabs, new lines)
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
