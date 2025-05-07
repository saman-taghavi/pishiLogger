import { ofetch } from "ofetch";
import { ResolvedChangelogConfig } from "../../config";
import { channelResponse } from "./api.types";

const LOGIN = (mattermostURL) => `${mattermostURL}/api/v4/users/login`;
const GET_USER_CHANNELS = (mattermostURL) =>
  `${mattermostURL}/api/v4/users/me/channels`;
const POST = (mattermostURL) => `${mattermostURL}/api/v4/posts`;
const UPLOAD_FILE = (mattermostURL) => `${mattermostURL}/api/v4/files`;

export const sendToMatteMost = async (
  markdown: string,
  title: string,
  config: ResolvedChangelogConfig
) => {
  if (config.publisher.mattermost.webhook) {
    await sendWithWebhook({ config, markdown });
  } else {
    sendWithUserPass(markdown, title, config);
  }
};
export async function sendWithUserPass(
  markdown: string,
  title: string,
  config: ResolvedChangelogConfig
) {
  const mattermostUrl = config.publisher.mattermost.url;
  const user = await ofetch
    .raw(LOGIN(mattermostUrl), {
      method: "POST",
      body: JSON.stringify({
        login_id: config.publisher.mattermost.username,
        password: config.publisher.mattermost.password,
        token: "",
        deviceId: "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      throw new Error("mattermost login", { cause: error });
    });
  const token = user.headers.get("Token");

  const channels = await ofetch<channelResponse>(
    GET_USER_CHANNELS(mattermostUrl),
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => {
    throw new Error("mattermost login", { cause: error });
  });
  if (channels.length === 0) {
    throw new Error("mattermost user doesn't have any channels");
  }

  const chanelId = channels.find((item) => {
    return item.name === config.publisher.mattermost.channelName;
  });

  if (!chanelId) {
    throw new Error(
      "mattermost channel doesn't exist or user is not in channel"
    );
  }

  try {
    // Convert the markdown string to a Blob (which acts as our file)
    const fileBlob = new Blob([markdown], { type: "text/markdown" });

    // Create a FormData instance and append the file and channel_id
    const form = new FormData();
    // Mattermost expects the file field to be named "files"
    form.append("files", fileBlob, `${title}.md`);
    form.append("channel_id", chanelId.id);
    const uploadResponse = await ofetch(UPLOAD_FILE(mattermostUrl), {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Do not set Content-Type manually with FormData.
      },
    });
    console.log("Upload response:", uploadResponse);

    // --- Step 2: Post a message with the file attached ---
    const postPayload = {
      channel_id: chanelId.id,
      // Message includes a preview of the file content
      message: `#${title}`,
      file_ids: [uploadResponse.file_infos[0].id],
    };

    const postResponse = await ofetch(POST(mattermostUrl), {
      method: "POST",
      body: JSON.stringify(postPayload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return postResponse;
  } catch (error) {
    console.error("Error:", error);
  }
}

const sendWithWebhook = async ({
  config,
  markdown,
}: {
  markdown: string;
  config: ResolvedChangelogConfig;
}) => {
  try {
    const matterMostWebHook = config.publisher.mattermost.webhook;
    if (!matterMostWebHook) {
      throw new Error("mattermost webhook", {
        cause: "NO config.publisher.mattermost.webhook",
      });
    }
    await ofetch(matterMostWebHook, {
      method: "POST",
      body: {
        text: markdown,
      },
    });
  } catch (error) {
    throw new Error("mattermost webhook", {
      cause: error,
    });
  }
};
