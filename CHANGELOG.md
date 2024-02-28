# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.6.0](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.4.0...v1.6.0) (2024-02-28)


### Features

* add Amazigh calendar system ([2d9a8e9](https://github.com/calidy-com/dayjs-calendarsystems/commit/2d9a8e9b0c5c443040072080edfe748abfef5e9a))


### Bug Fixes

* typo in function brackets ([595d119](https://github.com/calidy-com/dayjs-calendarsystems/commit/595d1193c9cedeeaee39b9ae6c617dba6bcd338a))

## [1.4.0](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.3.0...v1.4.0) (2023-06-21)


### Features

* code optimization, cleanup and more functions. Added a WIP for Ethiopian calendar, still not stable. Fixed timezone and utc calculations ([731d5c5](https://github.com/calidy-com/dayjs-calendarsystems/commit/731d5c59601de994287f2022f272f32d86636e9c))

## [1.3.0](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.2.0...v1.3.0) (2023-06-02)


### Features

* Added Hebrew Calendar System, hebrew tests, fix typescript issues, code cleanup, introduced new isLeapYear function (rewrites dayjs plugin to work on all calendar systems) ([fd550e1](https://github.com/calidy-com/dayjs-calendarsystems/commit/fd550e1bbf32a1b50a714ea6bf167b8f8e4c2ae1))

## [1.2.0](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.1.3...v1.2.0) (2023-05-31)


### Features

* Huge perf improvement by caching Intl Api formatters ([7f19395](https://github.com/calidy-com/dayjs-calendarsystems/commit/7f19395fd5bf53567565a307a9e3806f4eb65647))

### [1.1.3](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.1.2...v1.1.3) (2023-05-23)


### Bug Fixes

* complexe calendar system conversions are now working, example: persian to islamic to gregory to persian.... ([3f5c633](https://github.com/calidy-com/dayjs-calendarsystems/commit/3f5c633a0f5b667cc95a7add8b8ce153549bb4e1))

### [1.1.2](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.1.1...v1.1.2) (2023-05-23)


### Bug Fixes

* update  method to accepts all units ([c23b049](https://github.com/calidy-com/dayjs-calendarsystems/commit/c23b0497bd9276e1e1bebf6c79b6f661db862317))

### [1.1.1](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.1.0...v1.1.1) (2023-05-23)


### Bug Fixes

* add hijri (islamic) to CalendarSystem type export ([605dbe0](https://github.com/calidy-com/dayjs-calendarsystems/commit/605dbe06f089d34d08c4df3dba709c065560a13e))

## [1.1.0](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.19...v1.1.0) (2023-05-23)


### Features

* new hijri/islamic calendar system available. ([5a14c21](https://github.com/calidy-com/dayjs-calendarsystems/commit/5a14c21ec6ff01744fe4bb236cc67e6c3db69e69))

### [1.0.19](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.18...v1.0.19) (2023-05-22)


### Bug Fixes

* persian calendar converter is now using astronomical calculations and fixes leap year calculations. added more tests and cleaned the underlayer converter library. ([c0ea087](https://github.com/calidy-com/dayjs-calendarsystems/commit/c0ea087098f281e0790754f3872770c435ac59cd))

### [1.0.18](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.17...v1.0.18) (2023-05-22)


### Bug Fixes

* more typescript cleaning and fixing, add more docs ([4b42986](https://github.com/calidy-com/dayjs-calendarsystems/commit/4b429864b99f3c7355b9b70791f348425548b64f))

### [1.0.17](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.16...v1.0.17) (2023-05-22)


### Bug Fixes

* typescript export calendar types as CalendarSystem type ([b81c93a](https://github.com/calidy-com/dayjs-calendarsystems/commit/b81c93a43798813d156aec427594fa182133143a))

### [1.0.16](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.15...v1.0.16) (2023-05-22)


### Bug Fixes

* more typescript cleaning and fixing ([949eb8d](https://github.com/calidy-com/dayjs-calendarsystems/commit/949eb8d88644fe0ba45de75a19b1995867eddb48))

### [1.0.15](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.14...v1.0.15) (2023-05-22)


### Bug Fixes

* typescript cleaning and fixing ([4b6c6f0](https://github.com/calidy-com/dayjs-calendarsystems/commit/4b6c6f04a4a2e8c70634109863e5830f4219fd52))

### [1.0.14](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.13...v1.0.14) (2023-05-21)


### Bug Fixes

* utc and timezone plugins are now compatible with our plugin. more tests are welcome ([c6f5c3b](https://github.com/calidy-com/dayjs-calendarsystems/commit/c6f5c3b4601f71b2e0971c489f0766ac87440fac))

### [1.0.13](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.12...v1.0.13) (2023-05-21)


### Bug Fixes

* timezone plugin compatibility. Note: when extending dayjs with plugins, make sure to have utc and timeZone plugins AFTER our calendarSystems plugin ([470b66c](https://github.com/calidy-com/dayjs-calendarsystems/commit/470b66c93c4a2de84110e4c317073b8db65e7501))

### [1.0.12](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.11...v1.0.12) (2023-05-20)


### Bug Fixes

* workaround for minification and classnames check ([3ec030f](https://github.com/calidy-com/dayjs-calendarsystems/commit/3ec030fc5606ccc21cc900fe25ba7a222288ea6b))

### [1.0.11](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.10...v1.0.11) (2023-05-20)


### Bug Fixes

* file names in exported dist plugins ([2228de8](https://github.com/calidy-com/dayjs-calendarsystems/commit/2228de85050500c94978b6de4928cd41ba165904))

### [1.0.10](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.9...v1.0.10) (2023-05-20)


### Bug Fixes

* folder names and paths typo in builder ([b080591](https://github.com/calidy-com/dayjs-calendarsystems/commit/b080591b34d86d9d6c6f7f7ee89c8bdb81e6d7da))
* package.json syntax ([8abd5cb](https://github.com/calidy-com/dayjs-calendarsystems/commit/8abd5cb4a94937c63fc422a2724fda56dc478880))

### [1.0.9](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.8...v1.0.9) (2023-05-20)


### Bug Fixes

* path type in builder ([3168149](https://github.com/calidy-com/dayjs-calendarsystems/commit/316814968d3ee10f8f5c78eb8c514b36c721e00c))

### [1.0.8](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.7...v1.0.8) (2023-05-20)


### Bug Fixes

* fixing file structure and names and example ([35d2ecb](https://github.com/calidy-com/dayjs-calendarsystems/commit/35d2ecbf814a5a4d0ebf4bd8e434800002ac8866))

### [1.0.7](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.6...v1.0.7) (2023-05-20)


### Bug Fixes

* fixing npm publish scripts ([3f48f12](https://github.com/calidy-com/dayjs-calendarsystems/commit/3f48f12d3358dfb92338915056b2c4feceeee452))

### [1.0.6](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.5...v1.0.6) (2023-05-20)


### Bug Fixes

* add .yarnrc to help yarn pick the .npmrc file for auth ([9f2fdc6](https://github.com/calidy-com/dayjs-calendarsystems/commit/9f2fdc637556986cd62d295249f6ad07ef816725))

### [1.0.5](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.4...v1.0.5) (2023-05-20)

### [1.0.4](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.3...v1.0.4) (2023-05-20)


### Bug Fixes

* remove useless schema ([386c9af](https://github.com/calidy-com/dayjs-calendarsystems/commit/386c9afe7deeb62a6906e81628f4db55b05cea6e))

### [1.0.3](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.2...v1.0.3) (2023-05-20)


### Bug Fixes

* prepare for npm publishing ([c9ca47b](https://github.com/calidy-com/dayjs-calendarsystems/commit/c9ca47bc77427126101ebea1208c3f2f3cfd7c19))

### [1.0.2](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.1...v1.0.2) (2023-05-20)

### [1.0.1](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.0.0...v1.0.1) (2023-05-20)


### Bug Fixes

* prepare for npm publishing ([23056f8](https://github.com/calidy-com/dayjs-calendarsystems/commit/23056f8682f38c7d581cbfc3636ed1d9b3e9f649))
* prepare for npm publishing ([2b76d88](https://github.com/calidy-com/dayjs-calendarsystems/commit/2b76d884f25322fd6dadaa8a0cc8e0785deae20d))

## 1.0.0 (2023-05-20)


### Features

* Stable Release v1 ([df736a3](https://github.com/calidy-com/dayjs-calendarsystems/commit/df736a34477a399e0da5706711579428c5c18a82))


### Bug Fixes

* Licensing update, fix author and contributors fields and info ([060e607](https://github.com/calidy-com/dayjs-calendarsystems/commit/060e60770ca8cc36280ea059a093054c4fa89a40))
* Licensing update, fix author and contributors fields and info ([9adc7b9](https://github.com/calidy-com/dayjs-calendarsystems/commit/9adc7b9f1c7125fa245c11f709872d878ee2886b))
