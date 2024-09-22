# about

this is a small package to help with a simple versioning problem I had at work and speedup manual labor, nevertheless I am open to ideas and hope this would be usefull to anyone who may need it.

# envs

also note that this version currently only works with gitlab

```json
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
  DISCORD_PROJECT_COLOR_DIGIT:
    process.env.DISCORD_PROJECT_COLOR_DIGIT ?? 2646246,
  DISCORD_NAME: process.env.DISCORD_NAME || "پیشی جان",
  DISCORD_AVATAR: process.env.DISCORD_AVATAR || "https://cataas.com/cat",
};
```

and here is the default scope object

```json
{
  "build": "build",
  "ci": "ci",
  "docs": "docs",
  "feat": "feat",
  "fix": "fix",
  "perf": "perf",
  "refactor": "refactor",
  "test": "test"
}
```

open a pr for any change that you want to be made :)

Also to use this you only need to add a step to your `.gitlab-ci.yml` file like so:

```yml
stages:
  # add this stage before publish
  - changeLogs
```

```yml
update-changelog:
  stage: changeLogs
  image: node:lts-alpine
  rules:
    # change this rule if you follow a different tag format
    - if: '$CI_COMMIT_TAG =~ /^v\d+\.\d+\.\d+$/'
    - when: never
  before_script:
    - apk add --no-cache git
  script:
    # here we set the two commit tags to envs
    - export PREVIOUS_TAG_SHA=$(git rev-list -n 1 $(git describe --abbrev=0 --tags "${CI_COMMIT_TAG}^"))
    - export CURRENT_TAG_SHA=$(git rev-list -n 1 "${CI_COMMIT_TAG}")
    - npx pishilogger
```
