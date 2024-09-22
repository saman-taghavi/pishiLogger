# about

this is a small package to help with a simple versioning problem I had at work and speedup manual labor, nevertheless I am open to ideas and hope this would be usefull to anyone who may need it.

# envs

also note that this version currently only works with gitlab

```json
{
  "SCOPES": "should be provided as an object with the same key/value pair",
  "PREVIOUS_TAG_SHA": "this is provided in the following yml",
  "CURRENT_TAG_SHA": "this is provided in the following yml",
  "CI_COMMIT_TAG": "this is provided by gitlab ci",
  "GIT_PROJECT_API": "your git project api",
  "GIT_TOKEN": "your PAC or your project access token to read the commits",
  "GIT_PROJECT_URL": "your git project url",
  "CLICK_UP_WORKSPACE_ID": "your click up workspace id, you can see it in the url",
  "CLICK_UP_DOC_ID": "create a doc in click up and see the url for id",
  "CLICK_UP_TOKEN": "genereate a clickup token to upload to clickup",
  "DISCORD_HOOK": "a discord hook",
  "DISCORD_PROJECT_IMG": "an image for prjoect to include in discord message",
  "DISCORD_PROJECT_COLOR_DIGIT": "the color for discord message",
  "DISCORD_NAME": "a name for discord bot",
  "DISCORD_AVATAR": "an avatar for discord bot"
}
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
