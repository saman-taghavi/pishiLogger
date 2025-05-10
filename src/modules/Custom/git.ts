import { execCommand } from "../../exec";
import { RawGitCommit } from "../../git";

export async function getGitDiff({
  from,
  to = "HEAD",
  customSeperator = "|",
  cwd,
}: {
  from: string | undefined;
  to: string | undefined;
  cwd?: string;
  customSeperator: string;
}): Promise<RawGitCommit[]> {
  // https://git-scm.com/docs/pretty-formats
  const r = execCommand(
    `git --no-pager log "${from ? `${from}...` : ""}${to}" --pretty="----%n%s${customSeperator}%h${customSeperator}%an${customSeperator}%ae%n%b" --name-status`,
    cwd
  );

  return r
    .split("----\n")
    .splice(1)
    .map((line) => {
      const [firstLine, ..._body] = line.split("\n");
      const [message, shortHash, authorName, authorEmail] =
        firstLine.split("|");
      const r: RawGitCommit = {
        message,
        shortHash,
        author: { name: authorName, email: authorEmail },
        body: _body.join("\n"),
      };
      return r;
    });
}
