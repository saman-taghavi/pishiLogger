# Changelog


## v1.1.1

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v1.1.0...v1.1.1)

### 🏡 Chore

- Track version name ([722882d](https://github.com/saman-taghavi/pishiLogger/commit/722882d))

### ❤️ Contributors

- Saman-taghavi <taghavisani@gmail.com>

## v1.1.0

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.6.1...v1.1.0)

### 🚀 Enhancements

- Rename package to pishilogger and add GitLab command support ([2b78ef7](https://github.com/saman-taghavi/pishiLogger/commit/2b78ef7))
- Hide author email address via flag ([#247](https://github.com/saman-taghavi/pishiLogger/pull/247))
- Add `noAuthors` option ([#183](https://github.com/saman-taghavi/pishiLogger/pull/183))

### 🩹 Fixes

- Use custom separator in getGitDiff function ([6d3ed4e](https://github.com/saman-taghavi/pishiLogger/commit/6d3ed4e))

### 📖 Documentation

- Add note about version number interpretation ([#272](https://github.com/saman-taghavi/pishiLogger/pull/272))
- Add note about version number interpretation ([#272](https://github.com/saman-taghavi/pishiLogger/pull/272))

### 🏡 Chore

- **readme:** Fix typo ([#270](https://github.com/saman-taghavi/pishiLogger/pull/270))
- Add bun.lock to .gitignore ([da975fe](https://github.com/saman-taghavi/pishiLogger/commit/da975fe))
- **release:** V0.6.0 ([655472e](https://github.com/saman-taghavi/pishiLogger/commit/655472e))
- **release:** V0.6.1 ([88e9713](https://github.com/saman-taghavi/pishiLogger/commit/88e9713))
- **readme:** Fix typo ([#270](https://github.com/saman-taghavi/pishiLogger/pull/270))
- **gitlab:** Remove unused existsSync import ([3d77707](https://github.com/saman-taghavi/pishiLogger/commit/3d77707))
- Remove unused getPreview function ([](https://github.com/saman-taghavi/pishiLogger/commit/))
- **release:** V2.0.0 ([5d573ee](https://github.com/saman-taghavi/pishiLogger/commit/5d573ee))
- **release:** V2.0.1 ([6c9bb81](https://github.com/saman-taghavi/pishiLogger/commit/6c9bb81))
- Change names only ([57635c5](https://github.com/saman-taghavi/pishiLogger/commit/57635c5))
- Remove unused code and clean up files ([](https://github.com/saman-taghavi/pishiLogger/commit/))
- Seperation from main branch ([155a64f](https://github.com/saman-taghavi/pishiLogger/commit/155a64f))
- **release:** V1.1.0 ([367e7d9](https://github.com/saman-taghavi/pishiLogger/commit/367e7d9))
- **release:** V2.0.0 ([6aaa9bf](https://github.com/saman-taghavi/pishiLogger/commit/6aaa9bf))

### ❤️ Contributors

- Saman-taghavi <taghavisani@gmail.com>
- 7e81a0b ([@saman-taghavi](https://github.com/saman-taghavi))
- D90f4ed ([@saman-taghavi](https://github.com/saman-taghavi))
- Adarsh DK <adarsh.dk24012@gmail.com>
- B. Jonson ([@who-jonson](https://github.com/who-jonson))
- Pooya Parsa ([@pi0](https://github.com/pi0))
- Klein Petr ([@kleinpetr](https://github.com/kleinpetr))
- Philipp Kief ([@PKief](https://github.com/PKief))

## v2.0.0


### 🚀 Enhancements

- Generate breaking changes section ([cc0b427](https://github.com/saman-taghavi/pishiLogger/commit/cc0b427))
- Add missing commitlint types ([#6](https://github.com/saman-taghavi/pishiLogger/pull/6))
- GetGitDiff ignores from ([#17](https://github.com/saman-taghavi/pishiLogger/pull/17))
- Add gitmoji support ([#22](https://github.com/saman-taghavi/pishiLogger/pull/22))
- Auto-update changelog files ([#24](https://github.com/saman-taghavi/pishiLogger/pull/24))
- Support `--bump` to update version while generating changelog ([9bf9aff](https://github.com/saman-taghavi/pishiLogger/commit/9bf9aff))
- Basic `--release` support ([934c487](https://github.com/saman-taghavi/pishiLogger/commit/934c487))
- Generate markdown links when github is provided ([ffe1d08](https://github.com/saman-taghavi/pishiLogger/commit/ffe1d08))
- **cli:** ⚠️  Show changelog in CLI unless bumping or releasing ([d348943](https://github.com/saman-taghavi/pishiLogger/commit/d348943))
- Handle new version before generating changelog ([fd56f6b](https://github.com/saman-taghavi/pishiLogger/commit/fd56f6b))
- Expose `determineSemverChange` and `bumpVersion` ([5451f18](https://github.com/saman-taghavi/pishiLogger/commit/5451f18))
- Infer github config from package.json ([#37](https://github.com/saman-taghavi/pishiLogger/pull/37))
- ⚠️  Resolve github usernames using `ungh/ungh` ([#46](https://github.com/saman-taghavi/pishiLogger/pull/46))
- Update execa to v7 ([e61e2f6](https://github.com/saman-taghavi/pishiLogger/commit/e61e2f6))
- ⚠️  Support different repository providers ([#55](https://github.com/saman-taghavi/pishiLogger/pull/55))
- Github release integration ([#67](https://github.com/saman-taghavi/pishiLogger/pull/67))
- Support explicit bumping as major, minor, or patch via cli ([c8afa86](https://github.com/saman-taghavi/pishiLogger/commit/c8afa86))
- Automatically resolve github token from gh cli ([231a3ec](https://github.com/saman-taghavi/pishiLogger/commit/231a3ec))
- Default `gh release` to latest version ([44788f5](https://github.com/saman-taghavi/pishiLogger/commit/44788f5))
- Resolve repository config from git remote ([8401f91](https://github.com/saman-taghavi/pishiLogger/commit/8401f91))
- Load config from `changelog` field in `package.json` ([#88](https://github.com/saman-taghavi/pishiLogger/pull/88))
- Bump pre version ([#70](https://github.com/saman-taghavi/pishiLogger/pull/70))
- Support templates for commit and tag messages ([#68](https://github.com/saman-taghavi/pishiLogger/pull/68))
- Support `--publish` and `--canary` ([#123](https://github.com/saman-taghavi/pishiLogger/pull/123))
- `repo` option as string ([#128](https://github.com/saman-taghavi/pishiLogger/pull/128))
- Add param to require clean working dir ([#92](https://github.com/saman-taghavi/pishiLogger/pull/92), [#93](https://github.com/saman-taghavi/pishiLogger/pull/93))
- Add excludeAuthors option ([#95](https://github.com/saman-taghavi/pishiLogger/pull/95))
- Add option to sign git tags ([#117](https://github.com/saman-taghavi/pishiLogger/pull/117))
- **git:** Support parse git messages that have prefix emoji ([#146](https://github.com/saman-taghavi/pishiLogger/pull/146))
- Update jiti to v2 ([6e85d32](https://github.com/saman-taghavi/pishiLogger/commit/6e85d32))
- Add check for breaking changes in commit body ([#228](https://github.com/saman-taghavi/pishiLogger/pull/228))
- Hide author email address via flag ([#247](https://github.com/saman-taghavi/pishiLogger/pull/247))
- Add `noAuthors` option ([#183](https://github.com/saman-taghavi/pishiLogger/pull/183))
- Rename package to pishilogger and add GitLab command support ([2b78ef7](https://github.com/saman-taghavi/pishiLogger/commit/2b78ef7))
- Hide author email address via flag ([#247](https://github.com/saman-taghavi/pishiLogger/pull/247))
- Add `noAuthors` option ([#183](https://github.com/saman-taghavi/pishiLogger/pull/183))

### 🩹 Fixes

- Avoid `.exec` for multi matches ([7c612fc](https://github.com/saman-taghavi/pishiLogger/commit/7c612fc))
- Format names for case matching ([ece2d90](https://github.com/saman-taghavi/pishiLogger/commit/ece2d90))
- **cli:** Use `/usr/bin/env` ([#5](https://github.com/saman-taghavi/pishiLogger/pull/5))
- Remove `general` in entries without scope ([31a0861](https://github.com/saman-taghavi/pishiLogger/commit/31a0861))
- Expose `./config` ([#10](https://github.com/saman-taghavi/pishiLogger/pull/10))
- Use `getCurrentGitRef` ([#15](https://github.com/saman-taghavi/pishiLogger/pull/15))
- **parse:** ⚠️  `references` with type ([#27](https://github.com/saman-taghavi/pishiLogger/pull/27))
- Convertminor to patch for 0.x versions ([011b6a1](https://github.com/saman-taghavi/pishiLogger/commit/011b6a1))
- Run release step last ([b052f55](https://github.com/saman-taghavi/pishiLogger/commit/b052f55))
- Handle breaking change commits for bumping ([f7ffaa4](https://github.com/saman-taghavi/pishiLogger/commit/f7ffaa4))
- Show original semver type without 0.x changes in log ([ddd818a](https://github.com/saman-taghavi/pishiLogger/commit/ddd818a))
- Use `v` prefix for git tag and annotate ([bf6b5da](https://github.com/saman-taghavi/pishiLogger/commit/bf6b5da))
- Add missing annotate message ([157b0c5](https://github.com/saman-taghavi/pishiLogger/commit/157b0c5))
- Use last commit for changelog diff ([6ac4b4b](https://github.com/saman-taghavi/pishiLogger/commit/6ac4b4b))
- Use h2 for title ([fc0967c](https://github.com/saman-taghavi/pishiLogger/commit/fc0967c))
- Import semver as default import ([3bd0b61](https://github.com/saman-taghavi/pishiLogger/commit/3bd0b61))
- Use `creatordate` to find last tag ([#39](https://github.com/saman-taghavi/pishiLogger/pull/39))
- Use release version in changelog title ([04671a6](https://github.com/saman-taghavi/pishiLogger/commit/04671a6))
- Let `--output` work without value ([#43](https://github.com/saman-taghavi/pishiLogger/pull/43))
- Consider docs and refactor as semver patch for bump ([648ccf1](https://github.com/saman-taghavi/pishiLogger/commit/648ccf1))
- Only skip non breaking `chre(deps)` ([20e622e](https://github.com/saman-taghavi/pishiLogger/commit/20e622e))
- **markdown:** Avoid rendering `noreply.github.com` emails ([4871721](https://github.com/saman-taghavi/pishiLogger/commit/4871721))
- Avoid rendering authors with `[bot]` in their name ([4f3f644](https://github.com/saman-taghavi/pishiLogger/commit/4f3f644))
- Format name to avoid duplicates ([f74a988](https://github.com/saman-taghavi/pishiLogger/commit/f74a988))
- Bump by patch by default ([7e38438](https://github.com/saman-taghavi/pishiLogger/commit/7e38438))
- Stage `CHANGELOG.md` and `package.json` when releasing ([69d375c](https://github.com/saman-taghavi/pishiLogger/commit/69d375c))
- Add correct output file to git ([#64](https://github.com/saman-taghavi/pishiLogger/pull/64))
- Update ungh link ([a5ab510](https://github.com/saman-taghavi/pishiLogger/commit/a5ab510))
- Only access latest tag accessible from current branch ([#69](https://github.com/saman-taghavi/pishiLogger/pull/69))
- **cli:** Don't eat up first `-*` arg ([77b483b](https://github.com/saman-taghavi/pishiLogger/commit/77b483b))
- Allow providing no versions ([ac84c39](https://github.com/saman-taghavi/pishiLogger/commit/ac84c39))
- Use parsed release body ([aec2341](https://github.com/saman-taghavi/pishiLogger/commit/aec2341))
- Strip title line from release ([319f7ce](https://github.com/saman-taghavi/pishiLogger/commit/319f7ce))
- Handle unset value for `config.repo` ([#72](https://github.com/saman-taghavi/pishiLogger/pull/72))
- **getLastGitTag:** Handle when there are no git tags ([#77](https://github.com/saman-taghavi/pishiLogger/pull/77))
- **markdown:** Remove unnecessary spaces ([#106](https://github.com/saman-taghavi/pishiLogger/pull/106))
- Add missing type export to package.json ([#113](https://github.com/saman-taghavi/pishiLogger/pull/113))
- Extra spaces in contributors and breaking changes ([#134](https://github.com/saman-taghavi/pishiLogger/pull/134))
- Repo name with `-` or `.` ([#127](https://github.com/saman-taghavi/pishiLogger/pull/127))
- **github:** Use bearer token ([#180](https://github.com/saman-taghavi/pishiLogger/pull/180))
- Handle repo name with multiple segments ([#219](https://github.com/saman-taghavi/pishiLogger/pull/219))
- Lowercase scope when filtering ([#199](https://github.com/saman-taghavi/pishiLogger/pull/199))
- **bump:** Avoid using `+` for canary suffix ([#224](https://github.com/saman-taghavi/pishiLogger/pull/224))
- Use `https` proto for author's github link ([#225](https://github.com/saman-taghavi/pishiLogger/pull/225))
- Use `https` proto for author's github link in tests ([#226](https://github.com/saman-taghavi/pishiLogger/pull/226))
- Release version regex supporting pre versions ([#259](https://github.com/saman-taghavi/pishiLogger/pull/259))
- Use correct compare changes URL for Bitbucket ([#257](https://github.com/saman-taghavi/pishiLogger/pull/257))
- Use tag template for version title and compare change link ([#255](https://github.com/saman-taghavi/pishiLogger/pull/255))
- Render usernames in github changelog ([#265](https://github.com/saman-taghavi/pishiLogger/pull/265))
- Pass `cwd` in more places before running commands ([#266](https://github.com/saman-taghavi/pishiLogger/pull/266))
- Use custom separator in getGitDiff function ([6d3ed4e](https://github.com/saman-taghavi/pishiLogger/commit/6d3ed4e))

### 💅 Refactors

- Update emojies ([3c4fbac](https://github.com/saman-taghavi/pishiLogger/commit/3c4fbac))
- Update types ([6f19cb3](https://github.com/saman-taghavi/pishiLogger/commit/6f19cb3))
- ⚠️  Use flat scopes ([8e33e93](https://github.com/saman-taghavi/pishiLogger/commit/8e33e93))
- Use lines array for constructing markdown ([#16](https://github.com/saman-taghavi/pishiLogger/pull/16))
- Upgrade to `open` v9 ([315cbd0](https://github.com/saman-taghavi/pishiLogger/commit/315cbd0))
- Replace `execa` with `execSync` ([#222](https://github.com/saman-taghavi/pishiLogger/pull/222))
- Use human readable date for canary versions ([#223](https://github.com/saman-taghavi/pishiLogger/pull/223))
- Update execCommand ([68127be](https://github.com/saman-taghavi/pishiLogger/commit/68127be))
- Use consola for colors ([49e0401](https://github.com/saman-taghavi/pishiLogger/commit/49e0401))
- Use confbox for yaml parsing ([19e940c](https://github.com/saman-taghavi/pishiLogger/commit/19e940c))

### 📖 Documentation

- Small improvement ([#4](https://github.com/saman-taghavi/pishiLogger/pull/4))
- Use `npx changelogen@latest` to ensure using latest version ([8ec40b5](https://github.com/saman-taghavi/pishiLogger/commit/8ec40b5))
- Fix from format ([4373a86](https://github.com/saman-taghavi/pishiLogger/commit/4373a86))
- Add documentation about `--push` flag ([#114](https://github.com/saman-taghavi/pishiLogger/pull/114))
- Add note about version number interpretation ([#272](https://github.com/saman-taghavi/pishiLogger/pull/272))
- Add note about version number interpretation ([#272](https://github.com/saman-taghavi/pishiLogger/pull/272))

### 📦 Build

- Use dynamic import for execa for cjs support ([a794cf1](https://github.com/saman-taghavi/pishiLogger/commit/a794cf1))
- ⚠️  Esm-only dist ([4a22de6](https://github.com/saman-taghavi/pishiLogger/commit/4a22de6))

### 🏡 Chore

- Disable starter test ([9edd62d](https://github.com/saman-taghavi/pishiLogger/commit/9edd62d))
- **release:** 0.0.2 ([38d7ba1](https://github.com/saman-taghavi/pishiLogger/commit/38d7ba1))
- **release:** 0.0.3 ([1c0dcb7](https://github.com/saman-taghavi/pishiLogger/commit/1c0dcb7))
- **release:** 0.0.4 ([125fc28](https://github.com/saman-taghavi/pishiLogger/commit/125fc28))
- **release:** 0.0.5 ([0fb47ec](https://github.com/saman-taghavi/pishiLogger/commit/0fb47ec))
- **release:** 0.0.6 ([ce317f8](https://github.com/saman-taghavi/pishiLogger/commit/ce317f8))
- Comment unused fn ([9735e2e](https://github.com/saman-taghavi/pishiLogger/commit/9735e2e))
- **release:** 0.1.0 ([79d6a90](https://github.com/saman-taghavi/pishiLogger/commit/79d6a90))
- **release:** 0.1.1 ([37c407c](https://github.com/saman-taghavi/pishiLogger/commit/37c407c))
- Update lockfile and vitest config ([48f609b](https://github.com/saman-taghavi/pishiLogger/commit/48f609b))
- Use changelogen release flow ([2a8bb4f](https://github.com/saman-taghavi/pishiLogger/commit/2a8bb4f))
- **release:** 0.2.0 ([0ee9ecf](https://github.com/saman-taghavi/pishiLogger/commit/0ee9ecf))
- **release:** 0.2.1 ([99c4e6e](https://github.com/saman-taghavi/pishiLogger/commit/99c4e6e))
- **release:** 0.2.2 ([d0ef976](https://github.com/saman-taghavi/pishiLogger/commit/d0ef976))
- **release:** 0.2.3 ([8487e91](https://github.com/saman-taghavi/pishiLogger/commit/8487e91))
- **release:** 0.3.0 ([cdc7dd4](https://github.com/saman-taghavi/pishiLogger/commit/cdc7dd4))
- **release:** V0.3.1 ([25d8acc](https://github.com/saman-taghavi/pishiLogger/commit/25d8acc))
- **release:** V0.3.2 ([5c2babc](https://github.com/saman-taghavi/pishiLogger/commit/5c2babc))
- Manually update old changelog entries ([c3ff561](https://github.com/saman-taghavi/pishiLogger/commit/c3ff561))
- Update dependencies ([c210976](https://github.com/saman-taghavi/pishiLogger/commit/c210976))
- Fix typecheck ([8796cf1](https://github.com/saman-taghavi/pishiLogger/commit/8796cf1))
- **release:** V0.3.3 ([f4f42a3](https://github.com/saman-taghavi/pishiLogger/commit/f4f42a3))
- **release:** V0.3.4 ([6fc5087](https://github.com/saman-taghavi/pishiLogger/commit/6fc5087))
- **release:** V0.3.5 ([3828bda](https://github.com/saman-taghavi/pishiLogger/commit/3828bda))
- **release:** V0.4.0 ([a3cafa9](https://github.com/saman-taghavi/pishiLogger/commit/a3cafa9))
- Update renovate config ([#54](https://github.com/saman-taghavi/pishiLogger/pull/54))
- Update dependencies ([4216bc6](https://github.com/saman-taghavi/pishiLogger/commit/4216bc6))
- Update repo ([83c349f](https://github.com/saman-taghavi/pishiLogger/commit/83c349f))
- **release:** V0.4.1 ([d126f3a](https://github.com/saman-taghavi/pishiLogger/commit/d126f3a))
- Fix lint issue and update snapshots ([e162ab8](https://github.com/saman-taghavi/pishiLogger/commit/e162ab8))
- Mention gh cli login ([7f4a05f](https://github.com/saman-taghavi/pishiLogger/commit/7f4a05f))
- **release:** V0.5.0 ([585594e](https://github.com/saman-taghavi/pishiLogger/commit/585594e))
- Simplify release command ([225fa64](https://github.com/saman-taghavi/pishiLogger/commit/225fa64))
- **release:** V0.5.1 ([a14d749](https://github.com/saman-taghavi/pishiLogger/commit/a14d749))
- Update badges and small improvements ([146d1d4](https://github.com/saman-taghavi/pishiLogger/commit/146d1d4))
- Update dev dependencies ([0f44ee9](https://github.com/saman-taghavi/pishiLogger/commit/0f44ee9))
- **release:** V0.5.2 ([0a5d6c8](https://github.com/saman-taghavi/pishiLogger/commit/0a5d6c8))
- **release:** V0.5.3 ([db1c625](https://github.com/saman-taghavi/pishiLogger/commit/db1c625))
- **release:** V0.5.4 ([de240e5](https://github.com/saman-taghavi/pishiLogger/commit/de240e5))
- Update dependencies ([81f37bf](https://github.com/saman-taghavi/pishiLogger/commit/81f37bf))
- Keep prettier compatible ([cb9adf4](https://github.com/saman-taghavi/pishiLogger/commit/cb9adf4))
- Add autofix ci ([5bfe08e](https://github.com/saman-taghavi/pishiLogger/commit/5bfe08e))
- **release:** V0.5.5 ([14fa199](https://github.com/saman-taghavi/pishiLogger/commit/14fa199))
- Apply automated lint fixes ([72c407f](https://github.com/saman-taghavi/pishiLogger/commit/72c407f))
- Update ci ([bcb16cb](https://github.com/saman-taghavi/pishiLogger/commit/bcb16cb))
- Update non major deps ([7f714c9](https://github.com/saman-taghavi/pishiLogger/commit/7f714c9))
- Update to eslint v9 ([fd40be9](https://github.com/saman-taghavi/pishiLogger/commit/fd40be9))
- Apply automated lint fixes ([673255b](https://github.com/saman-taghavi/pishiLogger/commit/673255b))
- Update deps ([3cfbe27](https://github.com/saman-taghavi/pishiLogger/commit/3cfbe27))
- **release:** V0.5.6 ([5f263da](https://github.com/saman-taghavi/pishiLogger/commit/5f263da))
- **release:** V0.5.7 ([c3796c4](https://github.com/saman-taghavi/pishiLogger/commit/c3796c4))
- Lint ([031cfd6](https://github.com/saman-taghavi/pishiLogger/commit/031cfd6))
- Update deps ([b184f23](https://github.com/saman-taghavi/pishiLogger/commit/b184f23))
- Update ci ([8662c4e](https://github.com/saman-taghavi/pishiLogger/commit/8662c4e))
- Update esm-only deps ([0d5e31d](https://github.com/saman-taghavi/pishiLogger/commit/0d5e31d))
- **release:** V0.6.0 ([7c20c8d](https://github.com/saman-taghavi/pishiLogger/commit/7c20c8d))
- Update deps ([f728b52](https://github.com/saman-taghavi/pishiLogger/commit/f728b52))
- Update tsconfig ([e5dced7](https://github.com/saman-taghavi/pishiLogger/commit/e5dced7))
- **release:** V0.6.1 ([17ce7c7](https://github.com/saman-taghavi/pishiLogger/commit/17ce7c7))
- **readme:** Fix typo ([#270](https://github.com/saman-taghavi/pishiLogger/pull/270))
- Add bun.lock to .gitignore ([da975fe](https://github.com/saman-taghavi/pishiLogger/commit/da975fe))
- **release:** V0.6.0 ([655472e](https://github.com/saman-taghavi/pishiLogger/commit/655472e))
- **release:** V0.6.1 ([88e9713](https://github.com/saman-taghavi/pishiLogger/commit/88e9713))
- **readme:** Fix typo ([#270](https://github.com/saman-taghavi/pishiLogger/pull/270))
- **gitlab:** Remove unused existsSync import ([3d77707](https://github.com/saman-taghavi/pishiLogger/commit/3d77707))
- Remove unused getPreview function ([](https://github.com/saman-taghavi/pishiLogger/commit/))
- **release:** V2.0.0 ([5d573ee](https://github.com/saman-taghavi/pishiLogger/commit/5d573ee))
- **release:** V2.0.1 ([6c9bb81](https://github.com/saman-taghavi/pishiLogger/commit/6c9bb81))
- Change names only ([57635c5](https://github.com/saman-taghavi/pishiLogger/commit/57635c5))
- Remove unused code and clean up files ([](https://github.com/saman-taghavi/pishiLogger/commit/))
- Seperation from main branch ([155a64f](https://github.com/saman-taghavi/pishiLogger/commit/155a64f))
- **release:** V1.1.0 ([367e7d9](https://github.com/saman-taghavi/pishiLogger/commit/367e7d9))

### ✅ Tests

- Update snapshot ([102aa98](https://github.com/saman-taghavi/pishiLogger/commit/102aa98))
- Update snapshot ([b264c80](https://github.com/saman-taghavi/pishiLogger/commit/b264c80))
- Add tests for parsing co-authors from commit body ([#229](https://github.com/saman-taghavi/pishiLogger/pull/229))
- Update snapshot ([ec2618f](https://github.com/saman-taghavi/pishiLogger/commit/ec2618f))

### other

- Initial commit
- Update pnpm to v7.0.1 (#7)
- Update pnpm to v7.2.1 (#9)
- Update all non-major dependencies (#21)
- Update pnpm to v7.4.0 (#25)
- Update all non-major dependencies (#26)
- Update all non-major dependencies (#36)
- Update all non-major dependencies (#40)
- Update all non-major dependencies (#41)

#### ⚠️ Breaking Changes

- **cli:** ⚠️  Show changelog in CLI unless bumping or releasing ([d348943](https://github.com/saman-taghavi/pishiLogger/commit/d348943))
- ⚠️  Resolve github usernames using `ungh/ungh` ([#46](https://github.com/saman-taghavi/pishiLogger/pull/46))
- ⚠️  Support different repository providers ([#55](https://github.com/saman-taghavi/pishiLogger/pull/55))
- **parse:** ⚠️  `references` with type ([#27](https://github.com/saman-taghavi/pishiLogger/pull/27))
- ⚠️  Use flat scopes ([8e33e93](https://github.com/saman-taghavi/pishiLogger/commit/8e33e93))
- ⚠️  Esm-only dist ([4a22de6](https://github.com/saman-taghavi/pishiLogger/commit/4a22de6))

### ❤️ Contributors

- Saman-taghavi <taghavisani@gmail.com>
- 7e81a0b ([@saman-taghavi](https://github.com/saman-taghavi))
- D90f4ed ([@saman-taghavi](https://github.com/saman-taghavi))
- Adarsh DK <adarsh.dk24012@gmail.com>
- B. Jonson ([@who-jonson](https://github.com/who-jonson))
- Pooya Parsa ([@pi0](https://github.com/pi0))
- Klein Petr ([@kleinpetr](https://github.com/kleinpetr))
- Philipp Kief ([@PKief](https://github.com/PKief))
- Daniel Roe ([@danielroe](https://github.com/danielroe))
- Jasper Zonneveld ([@JaZo](https://github.com/JaZo))
- Thorsten Seyschab ([@toddeTV](https://github.com/toddeTV))
- Jan-Henrik Damaschke <jdamaschke@outlook.de>
- Damian Głowala ([@DamianGlowala](https://github.com/DamianGlowala))
- Wan Chiu ([@wan54](https://github.com/wan54))
- Jianqi Pan ([@Jannchie](https://github.com/Jannchie))
- Vasily Kuzin <exer7um@gmail.com>
- John Campion Jr <john@brightshore.com>
- Waleed Khaled ([@Waleed-KH](https://github.com/Waleed-KH))
- Maciej Kasprzyk <kapustka.maciek@gmail.com>
- Mazel <me@loicmazuel.com>
- Thomas Lamant ([@tmlmt](https://github.com/tmlmt))
- Zhong666 ([@aa900031](https://github.com/aa900031))
- Donald Shtjefni ([@dnldsht](https://github.com/dnldsht))
- Sébastien Chopin <seb@nuxtjs.com>
- Nozomu Ikuta <nick.0508.nick@gmail.com>
- Lvjiaxuan <471501748@qq.com>
- Ahad Birang <farnabaz@gmail.com>
- Conner ([@Intevel](https://github.com/Intevel))
- Anthony Fu <anthonyfu117@hotmail.com>
- 三咲智子 <sxzz@sxzz.moe>
- Julien Ripouteau ([@Julien-R44](https://github.com/Julien-R44))

## v1.1.0

[compare changes](https://github.com/saman-taghavi/pishiLogger/compare/v0.6.1...v1.1.0)

### 🚀 Enhancements

- Rename package to pishilogger and add GitLab command support ([2b78ef7](https://github.com/saman-taghavi/pishiLogger/commit/2b78ef7))
- Hide author email address via flag ([#247](https://github.com/saman-taghavi/pishiLogger/pull/247))
- Add `noAuthors` option ([#183](https://github.com/saman-taghavi/pishiLogger/pull/183))

### 📖 Documentation

- Add note about version number interpretation ([#272](https://github.com/saman-taghavi/pishiLogger/pull/272))
- Add note about version number interpretation ([#272](https://github.com/saman-taghavi/pishiLogger/pull/272))

### 🏡 Chore

- **readme:** Fix typo ([#270](https://github.com/saman-taghavi/pishiLogger/pull/270))
- Add bun.lock to .gitignore ([da975fe](https://github.com/saman-taghavi/pishiLogger/commit/da975fe))
- **release:** V0.6.0 ([655472e](https://github.com/saman-taghavi/pishiLogger/commit/655472e))
- **release:** V0.6.1 ([88e9713](https://github.com/saman-taghavi/pishiLogger/commit/88e9713))
- **readme:** Fix typo ([#270](https://github.com/saman-taghavi/pishiLogger/pull/270))
- **gitlab:** Remove unused existsSync import ([3d77707](https://github.com/saman-taghavi/pishiLogger/commit/3d77707))
- Remove unused getPreview function ([](https://github.com/saman-taghavi/pishiLogger/commit/))
- **release:** V2.0.0 ([5d573ee](https://github.com/saman-taghavi/pishiLogger/commit/5d573ee))
- **release:** V2.0.1 ([6c9bb81](https://github.com/saman-taghavi/pishiLogger/commit/6c9bb81))
- Change names only ([57635c5](https://github.com/saman-taghavi/pishiLogger/commit/57635c5))
- Remove unused code and clean up files ([](https://github.com/saman-taghavi/pishiLogger/commit/))
- Seperation from main branch ([155a64f](https://github.com/saman-taghavi/pishiLogger/commit/155a64f))

### ❤️ Contributors

- Saman-taghavi <taghavisani@gmail.com>
- 7e81a0b ([@saman-taghavi](https://github.com/saman-taghavi))
- D90f4ed ([@saman-taghavi](https://github.com/saman-taghavi))
- Adarsh DK <adarsh.dk24012@gmail.com>
- B. Jonson ([@who-jonson](https://github.com/who-jonson))
- Pooya Parsa ([@pi0](https://github.com/pi0))
- Klein Petr ([@kleinpetr](https://github.com/kleinpetr))
- Philipp Kief ([@PKief](https://github.com/PKief))

