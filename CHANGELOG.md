# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v2.2.0

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v2.1.0...v2.2.0)

### 🚀 Enhancements

- Rename package to pishilogger and add GitLab command support ([1b0527f](https://github.com/saman-taghavi/pishiLogger/commit/1b0527f))
- **gitlab:** Implement GitLab command with changelog generation and release support ([421f34d](https://github.com/saman-taghavi/pishiLogger/commit/421f34d))
- Add jira info to gitlab markdown ([262c057](https://github.com/saman-taghavi/pishiLogger/commit/262c057))
- Update gitlab wiki ([202a823](https://github.com/saman-taghavi/pishiLogger/commit/202a823))
- Add matermost version 1 ([8e4851e](https://github.com/saman-taghavi/pishiLogger/commit/8e4851e))

### 🩹 Fixes

- Update git log command to use custom separator and adjust tests for new repository name ([728a095](https://github.com/saman-taghavi/pishiLogger/commit/728a095))
- Eslint errors ([762fe48](https://github.com/saman-taghavi/pishiLogger/commit/762fe48))

### 📖 Documentation

- Update README to reflect package name change to pishilogger ([3cabb4e](https://github.com/saman-taghavi/pishiLogger/commit/3cabb4e))
- Update CHANGELOG links to reflect repository name change to pishiLogger ([eb053cc](https://github.com/saman-taghavi/pishiLogger/commit/eb053cc))

### 🏡 Chore

- Add bun.lock to .gitignore ([b95c1ec](https://github.com/saman-taghavi/pishiLogger/commit/b95c1ec))
- **release:** V2.1.0 ([40385a5](https://github.com/saman-taghavi/pishiLogger/commit/40385a5))
- **release:** V2.1.1 ([8ff688d](https://github.com/saman-taghavi/pishiLogger/commit/8ff688d))
- Add .env to .gitignore ([363b09a](https://github.com/saman-taghavi/pishiLogger/commit/363b09a))
- Update package description to reflect new repository URL ([a25cd30](https://github.com/saman-taghavi/pishiLogger/commit/a25cd30))
- Format with prettier ([0583426](https://github.com/saman-taghavi/pishiLogger/commit/0583426))

### other

- Keep it till here
- Add jira then upload to matter most and jira and git

### ❤️ Contributors

- Saman-taghavi <taghavisani@gmail.com>

## v2.1.1

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v2.1.0...v2.1.1)

### 📖 Documentation

- Update README to reflect package name change to pishilogger ([3cabb4e](https://github.com/saman-taghavi/pishiLogger/commit/3cabb4e))

### ❤️ Contributors

- Saman-taghavi <taghavisani@gmail.com>

## v2.1.0

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.5.7...v2.1.0)

### 🚀 Enhancements

- Update jiti to v2 ([6e85d32](https://github.com/saman-taghavi/pishiLogger/commit/6e85d32))
- Add check for breaking changes in commit body ([#228](https://github.com/saman-taghavi/pishiLogger/pull/228))
- Rename package to pishilogger and add GitLab command support ([1b0527f](https://github.com/saman-taghavi/pishiLogger/commit/1b0527f))

### 🩹 Fixes

- Use `https` proto for author's github link ([#225](https://github.com/saman-taghavi/pishiLogger/pull/225))
- Use `https` proto for author's github link in tests ([#226](https://github.com/saman-taghavi/pishiLogger/pull/226))

### 🏡 Chore

- Lint ([031cfd6](https://github.com/saman-taghavi/pishiLogger/commit/031cfd6))
- Add bun.lock to .gitignore ([b95c1ec](https://github.com/saman-taghavi/pishiLogger/commit/b95c1ec))

### ✅ Tests

- Add tests for parsing co-authors from commit body ([#229](https://github.com/saman-taghavi/pishiLogger/pull/229))

### ❤️ Contributors

- Saman-taghavi <taghavisani@gmail.com>
- Jan-Henrik Damaschke <jdamaschke@outlook.de>
- Pooya Parsa ([@pi0](https://github.com/pi0))
- Damian Głowala ([@DamianGlowala](https://github.com/DamianGlowala))

## v0.5.7

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.5.6...v0.5.7)

### 🩹 Fixes

- **bump:** Avoid using `+` for canary suffix ([#224](https://github.com/saman-taghavi/pishiLogger/pull/224))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.5.6

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.5.5...v0.5.6)

### 🚀 Enhancements

- Add option to sign git tags ([#117](https://github.com/saman-taghavi/pishiLogger/pull/117))
- **git:** Support parse git messages that have prefix emoji ([#146](https://github.com/saman-taghavi/pishiLogger/pull/146))

### 🩹 Fixes

- **github:** Use bearer token ([#180](https://github.com/saman-taghavi/pishiLogger/pull/180))
- Handle repo name with multiple segments ([#219](https://github.com/saman-taghavi/pishiLogger/pull/219))
- Lowercase scope when filtering ([#199](https://github.com/saman-taghavi/pishiLogger/pull/199))

### 💅 Refactors

- Replace `execa` with `execSync` ([#222](https://github.com/saman-taghavi/pishiLogger/pull/222))
- Use human readable date for canary versions ([#223](https://github.com/saman-taghavi/pishiLogger/pull/223))
- Update execCommand ([68127be](https://github.com/saman-taghavi/pishiLogger/commit/68127be))

### 🏡 Chore

- Apply automated lint fixes ([72c407f](https://github.com/saman-taghavi/pishiLogger/commit/72c407f))
- Update ci ([bcb16cb](https://github.com/saman-taghavi/pishiLogger/commit/bcb16cb))
- Update non major deps ([7f714c9](https://github.com/saman-taghavi/pishiLogger/commit/7f714c9))
- Update to eslint v9 ([fd40be9](https://github.com/saman-taghavi/pishiLogger/commit/fd40be9))
- Apply automated lint fixes ([673255b](https://github.com/saman-taghavi/pishiLogger/commit/673255b))
- Update deps ([3cfbe27](https://github.com/saman-taghavi/pishiLogger/commit/3cfbe27))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Klein Petr ([@kleinpetr](http://github.com/kleinpetr))
- Wan Chiu ([@wan54](http://github.com/wan54))
- Jianqi Pan ([@Jannchie](http://github.com/Jannchie))
- Vasily Kuzin <exer7um@gmail.com>
- Daniel Roe ([@danielroe](http://github.com/danielroe))

## v0.5.5

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.5.4...v0.5.5)

### 🚀 Enhancements

- `repo` option as string ([#128](https://github.com/saman-taghavi/pishiLogger/pull/128))
- Add param to require clean working dir ([#92](https://github.com/saman-taghavi/pishiLogger/pull/92), [#93](https://github.com/saman-taghavi/pishiLogger/pull/93))
- Add excludeAuthors option ([#95](https://github.com/saman-taghavi/pishiLogger/pull/95))

### 🩹 Fixes

- Extra spaces in contributors and breaking changes ([#134](https://github.com/saman-taghavi/pishiLogger/pull/134))
- Repo name with `-` or `.` ([#127](https://github.com/saman-taghavi/pishiLogger/pull/127))

### 🏡 Chore

- Update dependencies ([81f37bf](https://github.com/saman-taghavi/pishiLogger/commit/81f37bf))
- Keep prettier compatible ([cb9adf4](https://github.com/saman-taghavi/pishiLogger/commit/cb9adf4))
- Add autofix ci ([5bfe08e](https://github.com/saman-taghavi/pishiLogger/commit/5bfe08e))

### ❤️ Contributors

- John Campion Jr <john@brightshore.com>
- Waleed Khaled ([@Waleed-KH](http://github.com/Waleed-KH))
- Maciej Kasprzyk <kapustka.maciek@gmail.com>
- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.5.4

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.5.3...v0.5.4)

### 🚀 Enhancements

- Support `--publish` and `--canary` ([#123](https://github.com/saman-taghavi/pishiLogger/pull/123))

### 🩹 Fixes

- **markdown:** Remove unnecessary spaces ([#106](https://github.com/saman-taghavi/pishiLogger/pull/106))
- Add missing type export to package.json ([#113](https://github.com/saman-taghavi/pishiLogger/pull/113))

### 📖 Documentation

- Add documentation about `--push` flag ([#114](https://github.com/saman-taghavi/pishiLogger/pull/114))

### ❤️  Contributors

- Daniel Roe <daniel@roe.dev>
- Mazel <me@loicmazuel.com>
- Waleed Khaled ([@Waleed-KH](http://github.com/Waleed-KH))
- Thomas Lamant ([@tmlmt](http://github.com/tmlmt))

## v0.5.3

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.5.2...v0.5.3)

## v0.5.2

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.5.1...v0.5.2)


### 🚀 Enhancements

  - Resolve repository config from git remote ([8401f91](https://github.com/saman-taghavi/pishiLogger/commit/8401f91))
  - Load config from `changelog` field in `package.json` ([#88](https://github.com/saman-taghavi/pishiLogger/pull/88))
  - Bump pre version ([#70](https://github.com/saman-taghavi/pishiLogger/pull/70))
  - Support templates for commit and tag messages ([#68](https://github.com/saman-taghavi/pishiLogger/pull/68))

### 🩹 Fixes

  - Handle unset value for `config.repo` ([#72](https://github.com/saman-taghavi/pishiLogger/pull/72))
  - **getLastGitTag:** Handle when there are no git tags ([#77](https://github.com/saman-taghavi/pishiLogger/pull/77))

### 💅 Refactors

  - Upgrade to `open` v9 ([315cbd0](https://github.com/saman-taghavi/pishiLogger/commit/315cbd0))

### 🏡 Chore

  - Update badges and small improvements ([146d1d4](https://github.com/saman-taghavi/pishiLogger/commit/146d1d4))
  - Update dev dependencies ([0f44ee9](https://github.com/saman-taghavi/pishiLogger/commit/0f44ee9))

### ❤️  Contributors

- Zhong666 ([@aa900031](http://github.com/aa900031))
- Donald Shtjefni ([@dnldsht](http://github.com/dnldsht))
- Pooya Parsa ([@pi0](http://github.com/pi0))
- Sébastien Chopin <seb@nuxtjs.com>

## v0.5.1

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.5.0...v0.5.1)


### 🩹 Fixes

  - Allow providing no versions ([ac84c39](https://github.com/saman-taghavi/pishiLogger/commit/ac84c39))
  - Use parsed release body ([aec2341](https://github.com/saman-taghavi/pishiLogger/commit/aec2341))
  - Strip title line from release ([319f7ce](https://github.com/saman-taghavi/pishiLogger/commit/319f7ce))

### 🏡 Chore

  - Simplify release command ([225fa64](https://github.com/saman-taghavi/pishiLogger/commit/225fa64))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.5.0

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.4.1...v0.5.0)


### 🚀 Enhancements

  - Update execa to v7 ([e61e2f6](https://github.com/saman-taghavi/pishiLogger/commit/e61e2f6))
  - ⚠️  Support different repository providers ([#55](https://github.com/saman-taghavi/pishiLogger/pull/55))
  - Github release integration ([#67](https://github.com/saman-taghavi/pishiLogger/pull/67))
  - Support explicit bumping as major, minor, or patch via cli ([c8afa86](https://github.com/saman-taghavi/pishiLogger/commit/c8afa86))
  - Automatically resolve github token from gh cli ([231a3ec](https://github.com/saman-taghavi/pishiLogger/commit/231a3ec))
  - Default `gh release` to latest version ([44788f5](https://github.com/saman-taghavi/pishiLogger/commit/44788f5))

### 🩹 Fixes

  - Stage `CHANGELOG.md` and `package.json` when releasing ([69d375c](https://github.com/saman-taghavi/pishiLogger/commit/69d375c))
  - Add correct output file to git ([#64](https://github.com/saman-taghavi/pishiLogger/pull/64))
  - Update ungh link ([a5ab510](https://github.com/saman-taghavi/pishiLogger/commit/a5ab510))
  - Only access latest tag accessible from current branch ([#69](https://github.com/saman-taghavi/pishiLogger/pull/69))
  - **cli:** Don't eat up first `-*` arg ([77b483b](https://github.com/saman-taghavi/pishiLogger/commit/77b483b))

### 🏡 Chore

  - Fix lint issue and update snapshots ([e162ab8](https://github.com/saman-taghavi/pishiLogger/commit/e162ab8))
  - Mention gh cli login ([7f4a05f](https://github.com/saman-taghavi/pishiLogger/commit/7f4a05f))

#### ⚠️  Breaking Changes

  - ⚠️  Support different repository providers ([#55](https://github.com/saman-taghavi/pishiLogger/pull/55))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Daniel Roe <daniel@roe.dev>
- Donald Shtjefni ([@dnldsht](http://github.com/dnldsht))

## v0.4.1

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.4.0...v0.4.1)


### 🩹 Fixes

  - Bump by patch by default ([7e38438](https://github.com/saman-taghavi/pishiLogger/commit/7e38438))

### 🏡 Chore

  - Update renovate config ([#54](https://github.com/saman-taghavi/pishiLogger/pull/54))
  - Update dependencies ([4216bc6](https://github.com/saman-taghavi/pishiLogger/commit/4216bc6))
  - Update repo ([83c349f](https://github.com/saman-taghavi/pishiLogger/commit/83c349f))

### ❤️  Contributors

- Pooya Parsa <pooya@pi0.io>
- Nozomu Ikuta <nick.0508.nick@gmail.com>

## v0.4.0

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.3.5...v0.4.0)


### 🚀 Enhancements

  - ⚠️  Resolve github usernames using `ungh/ungh` ([#46](https://github.com/saman-taghavi/pishiLogger/pull/46))

### 🩹 Fixes

  - **markdown:** Avoid rendering `noreply.github.com` emails ([4871721](https://github.com/saman-taghavi/pishiLogger/commit/4871721))
  - Avoid rendering authors with `[bot]` in their name ([4f3f644](https://github.com/saman-taghavi/pishiLogger/commit/4f3f644))
  - Format name to avoid duplicates ([f74a988](https://github.com/saman-taghavi/pishiLogger/commit/f74a988))

#### ⚠️  Breaking Changes

  - ⚠️  Resolve github usernames using `ungh/ungh` ([#46](https://github.com/saman-taghavi/pishiLogger/pull/46))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.5

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.3.4...v0.3.5)


### 🩹 Fixes

  - Only skip non breaking `chre(deps)` ([20e622e](https://github.com/saman-taghavi/pishiLogger/commit/20e622e))

### ❤️  Contributors

- Pooya Parsa

## v0.3.4

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.3.3...v0.3.4)


### 🚀 Enhancements

  - Infer github config from package.json ([#37](https://github.com/saman-taghavi/pishiLogger/pull/37))

### ❤️  Contributors

- Pooya Parsa

## v0.3.3

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.3.2...v0.3.3)


### 🚀 Enhancements

  - Expose `determineSemverChange` and `bumpVersion` ([5451f18](https://github.com/saman-taghavi/pishiLogger/commit/5451f18))

### 🩹 Fixes

  - Let `--output` work without value ([#43](https://github.com/saman-taghavi/pishiLogger/pull/43))
  - Consider docs and refactor as semver patch for bump ([648ccf1](https://github.com/saman-taghavi/pishiLogger/commit/648ccf1))

### 🏡 Chore

  - Manually update old changelog entries ([c3ff561](https://github.com/saman-taghavi/pishiLogger/commit/c3ff561))
  - Update dependencies ([c210976](https://github.com/saman-taghavi/pishiLogger/commit/c210976))
  - Fix typecheck ([8796cf1](https://github.com/saman-taghavi/pishiLogger/commit/8796cf1))

### ❤️  Contributors

- Lvjiaxuan
- Pooya Parsa

## v0.3.2

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.3.1...v0.3.2)


### 🩹 Fixes

  - Use release version in changelog title ([04671a6](https://github.com/saman-taghavi/pishiLogger/commit/04671a6))

### ❤️  Contributors

- Pooya Parsa

## 0.3.1


### 🚀 Enhancements

  - Handle new version before generating changelog ([fd56f6b](https://github.com/saman-taghavi/pishiLogger/commit/fd56f6b))

### 🩹 Fixes

  - Use `creatordate` to find last tag ([#39](https://github.com/saman-taghavi/pishiLogger/pull/39))

### ❤️  Contributors

- Ahad Birang
- Pooya Parsa

## 0.3.0


### 🚀 Enhancements

  - **cli:** ⚠️  Show changelog in CLI unless bumping or releasing ([d348943](https://github.com/saman-taghavi/pishiLogger/commit/d348943))

#### ⚠️  Breaking Changes

  - **cli:** ⚠️  Show changelog in CLI unless bumping or releasing ([d348943](https://github.com/saman-taghavi/pishiLogger/commit/d348943))

### ❤️  Contributors

- Pooya Parsa

## 0.2.3


### 🩹 Fixes

  - Import semver as default import ([3bd0b61](https://github.com/saman-taghavi/pishiLogger/commit/3bd0b61))

### ❤️  Contributors

- Pooya Parsa

## 0.2.2


### 🚀 Enhancements

  - Generate markdown links when github is provided ([ffe1d08](https://github.com/saman-taghavi/pishiLogger/commit/ffe1d08))

### ✅ Tests

  - Update snapshot ([b264c80](https://github.com/saman-taghavi/pishiLogger/commit/b264c80))

### ❤️  Contributors

- Pooya Parsa

## 0.2.1


### 🩹 Fixes

  - Use last commit for changelog diff (6ac4b4b)
  - Use h2 for title (fc0967c)

### ✅ Tests

  - Update snapshot (102aa98)

### ❤️  Contributors

- Pooya Parsa

## 0.2.0


### 🚀 Enhancements

  - GetGitDiff ignores from (#17)
  - Add gitmoji support (#22)
  - Auto-update changelog files (#24)
  - Support `--bump` to update version while generating changelog (9bf9aff)
  - Basic `--release` support (934c487)

### 🩹 Fixes

  - Expose `./config` (#10)
  - Use `getCurrentGitRef` (#15)
  - **parse:** ⚠️  `references` with type (#27)
  - Convertminor to patch for 0.x versions (011b6a1)
  - Run release step last (b052f55)
  - Handle breaking change commits for bumping (f7ffaa4)
  - Show original semver type without 0.x changes in log (ddd818a)
  - Use `v` prefix for git tag and annotate (bf6b5da)
  - Add missing annotate message (157b0c5)

### 💅 Refactors

  - Use lines array for constructing markdown (#16)

### 🏡 Chore

  - Update lockfile and vitest config (48f609b)
  - Use changelogen release flow (2a8bb4f)

#### ⚠️  Breaking Changes

  - **parse:** ⚠️  `references` with type (#27)

### ❤️  Contributors

- Anthony Fu
- Conner
- Pooya Parsa
- 三咲智子

### 0.1.1


### Bug Fixes

* remove `general` in entries without scope ([31a0861](https://github.com/saman-taghavi/pishiLogger/commit/31a08615bb7da611dcaefe33b510d23aa7d2cc29))

## 0.1.0


### ⚠ BREAKING CHANGES

* use flat scopes

* use flat scopes ([8e33e93](https://github.com/saman-taghavi/pishiLogger/commit/8e33e93e6c4aa4b0b727d351fd73590626d1d6ce))

### 0.0.6

### 0.0.5


### Features

* add missing commitlint types ([#6](https://github.com/saman-taghavi/pishiLogger/issues/6)) ([0a6deef](https://github.com/saman-taghavi/pishiLogger/commit/0a6deefae9a433bbb2136ac8675976ac455dd159))

### 0.0.4


### Bug Fixes

* **cli:** use `/usr/bin/env` (resolves [#5](https://github.com/saman-taghavi/pishiLogger/issues/5)) ([e4218cc](https://github.com/saman-taghavi/pishiLogger/commit/e4218cc08d07b597137469396ba83ec709d7f174))

### 0.0.3


### Features

* generate breaking changes section ([cc0b427](https://github.com/saman-taghavi/pishiLogger/commit/cc0b4272543ffc012d15f038ffa62cdcaca35a44))


### Bug Fixes

* avoid `.exec` for multi matches ([7c612fc](https://github.com/saman-taghavi/pishiLogger/commit/7c612fc4e698e9f8fa1554405efb19b51d7c412f))
* format names for case matching ([ece2d90](https://github.com/saman-taghavi/pishiLogger/commit/ece2d9067171e2b34f45f3d86c28912e90106a6c))

### 0.0.2 (2022-05-02)
