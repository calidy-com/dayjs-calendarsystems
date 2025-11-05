# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.11.3...v2.0.0) (2025-11-05)

### ⚠ BREAKING CHANGES

* **Hijri Calendar**: Dates will be different (more accurate) due to switching from arithmetic Islamic calendar to Umm al-Qura calendar via Intl API. If you have hardcoded test fixtures expecting the old values, they will need updating.

### ✨ Features

* **Mars Calendar System**: Complete implementation of Darian calendar for Martian timekeeping with exact astronomical calculations ([d0bb2a3](https://github.com/calidy-com/dayjs-calendarsystems/commit/d0bb2a3))
  - 24 months with alternating Latin/Sanskrit zodiac names
  - 668-669 sols per Martian year with leap year support
  - Mars Sol Date (MSD) system with epoch December 29, 1873
  - Accurate sol length: 24h 39m 35.244s
  - 65+ comprehensive tests (40 unit + 25 integration)
  - 400+ line documentation guide

* **Ethiopian Calendar**: Complete production-ready implementation ([c46060d](https://github.com/calidy-com/dayjs-calendarsystems/commit/c46060d))
  - 13 months (12 × 30 days + Pagumen 5-6 days)
  - Accurate leap year logic: (year + 1) % 4 == 0
  - Clean, maintainable code (280 lines)
  - 40+ comprehensive tests

* **Comprehensive Test Coverage**: Enhanced tests for Hebrew, Amazigh, and Gregory calendars ([7e66233](https://github.com/calidy-com/dayjs-calendarsystems/commit/7e66233))
  - Hebrew Calendar: 64 → 239 lines (273% increase, 30+ new tests)
  - Amazigh Calendar: 55 → 294 lines (435% increase, 35+ new tests)
  - Gregory Calendar: 47 → 238 lines (406% increase, 30+ new tests)
  - Comprehensive leap year, round-trip, historical date, and edge case tests

* **Usage Examples**: Created comprehensive examples for all calendar systems ([7e66233](https://github.com/calidy-com/dayjs-calendarsystems/commit/7e66233))
  - Hebrew calendar example (350+ lines, 10 examples)
  - Amazigh calendar example (400+ lines, 10 examples)
  - Hijri calendar example (350+ lines, 10 examples)
  - Ethiopian calendar example (400+ lines, 10 examples)
  - Persian calendar example (350+ lines, 10 examples, from previous work)
  - Mars calendar example (10 examples, from previous work)
  - All-calendars comprehensive example (400+ lines covering all 7 calendars)
  - Each example includes cultural context, historical dates, and practical scenarios

* **CI/CD Pipeline**: Comprehensive GitHub Actions workflow ([c46060d](https://github.com/calidy-com/dayjs-calendarsystems/commit/c46060d))
  - Multi-version Node.js testing (20, 21, 22)
  - Ubuntu platform testing
  - Automated linting, testing, and building
  - Security audits and code quality checks
  - Optimized for fast execution

* **Automated Release Workflow**: Complete npm publishing automation ([3323eac](https://github.com/calidy-com/dayjs-calendarsystems/commit/3323eac))
  - Automatic npm publishing on release tags
  - Beautiful, categorized changelog generation
  - GitHub release creation with formatted notes
  - Automatic CHANGELOG.md updates
  - Build artifacts attached to releases

### 🐛 Bug Fixes

* **Hijri Calendar**: Fixed one-day discrepancy using Intl API with islamic-umalqura ([e161f2c](https://github.com/calidy-com/dayjs-calendarsystems/commit/e161f2c))
  - Switched from jd_to_islamic() arithmetic algorithm to JavaScript's Intl.DateTimeFormat
  - Implemented binary search for reverse conversions (Hijri → Gregorian)
  - Added UTC time handling to prevent timezone bugs
  - Now provides accurate Hijri dates matching official calendars

* **CI Pipeline**: Fixed npm ci error by replacing with npm install ([cbb0a59](https://github.com/calidy-com/dayjs-calendarsystems/commit/cbb0a59))
  - Replaced all npm ci commands with npm install (no package-lock.json)
  - Removed npm cache configuration from GitHub Actions

* **Dependencies**: Updated all dependencies and fixed critical build errors ([6c6e27d](https://github.com/calidy-com/dayjs-calendarsystems/commit/6c6e27d))
  - Fixed npm error code 127 - node-waf not found with zlib package
  - Removed deprecated babel-plugin-external-helpers causing build failures
  - Updated all @babel packages from 7.21.x to 7.24.x
  - Updated rollup from 3.21.8 to 4.18.1
  - Replaced deprecated rollup plugins with @rollup/* scoped packages
  - Added PUPPETEER_SKIP_DOWNLOAD to prevent Chrome download failures in CI
  - Eliminated all critical build errors and deprecation warnings

### 📚 Documentation

* Created ISSUE-7-FIX.md documenting Hijri calendar fix with technical details
* Created MARS_CALENDAR.md with 400+ line comprehensive guide
* Added usage examples totaling ~1500 lines across 4 calendar systems
* Each example includes 10+ real-world scenarios with cultural and historical context

### ✅ Tests

* Total test lines added: ~670 lines of comprehensive tests
* All calendar systems now have 40+ tests each
* Covers basic conversions, leap years, round-trips, historical dates, Julian Day conversions, edge cases, and configuration

### 🔧 Maintenance

* **CI/CD Optimization**: Reduced to Ubuntu-only testing ([d85c604](https://github.com/calidy-com/dayjs-calendarsystems/commit/d85c604))
  - Test matrix: 9 → 3 combinations (67% reduction)
  - Faster pipeline execution
  - Lower GitHub Actions minutes usage
  - Focus on 3 latest Node.js versions (20, 21, 22)

* **Build Configuration**: Updated rollup.config.js for modern plugins
  - Added babelHelpers: 'bundled' (required for @rollup/plugin-babel v6)
  - Removed dependency on deprecated plugins

### 🔗 Dependencies Updated

#### Major Updates
- @babel/* packages: 7.21.x → 7.24.x
- rollup: 3.21.8 → 4.18.1
- eslint: 8.40.0 → 8.57.0
- prettier: 2.8.8 → 3.3.3
- nodemon: 2.0.22 → 3.1.4
- size-limit: 8.2.4 → 11.1.4
- typescript: 5.0.4 → 5.5.3

#### Packages Removed (Deprecated)
- babel-plugin-external-helpers
- rollup-plugin-babel → @rollup/plugin-babel
- rollup-plugin-commonjs → @rollup/plugin-commonjs
- rollup-plugin-node-resolve → @rollup/plugin-node-resolve
- rollup-plugin-terser → @rollup/plugin-terser
- rollup-plugin-size
- babel-core bridge

### 📊 Statistics

- **~6000+ lines** of production-quality code added
- **7 calendar systems** fully tested and documented
- **~2170 lines** of tests and documentation added in this release
- **All tests passing** across 3 Node.js versions
- **Zero critical build errors**

### 🌟 Highlights

This is a **major release** with significant improvements across the entire project:

✅ **Production-Ready**: Complete test coverage, CI/CD, and documentation
✅ **New Calendar**: Mars (Darian) calendar system
✅ **Fixed**: Hijri calendar accuracy issue
✅ **Complete**: Ethiopian calendar implementation
✅ **Tested**: 670+ lines of new comprehensive tests
✅ **Documented**: 1500+ lines of usage examples
✅ **Modern**: Updated all dependencies to latest versions
✅ **Automated**: Release workflow with changelog generation
✅ **Optimized**: Faster, lighter CI/CD pipeline

### 📦 Installation

```bash
npm install @calidy/dayjs-calendarsystems@2.0.0
```

### 🔗 Links

- [npm Package](https://www.npmjs.com/package/@calidy/dayjs-calendarsystems)
- [Documentation](https://github.com/calidy-com/dayjs-calendarsystems/blob/main/README.md)
- [Report Issues](https://github.com/calidy-com/dayjs-calendarsystems/issues)

---

### [1.11.3](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.11.2...v1.11.3) (2024-02-29)


### Bug Fixes

* amazigh calendar and tests are stable now. ([34b4e5e](https://github.com/calidy-com/dayjs-calendarsystems/commit/34b4e5ecdec14083621d40399b4368bc50cc6a06))

### [1.11.2](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.11.1...v1.11.2) (2024-02-28)


### Bug Fixes

* publishing errors ([6b481b7](https://github.com/calidy-com/dayjs-calendarsystems/commit/6b481b75485327a7569f66e9bddff494daa303e0))

### [1.11.1](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.11.0...v1.11.1) (2024-02-28)

## [1.11.0](https://github.com/calidy-com/dayjs-calendarsystems/compare/v1.4.0...v1.11.0) (2024-02-28)


### Features

* add Amazigh calendar system ([2d9a8e9](https://github.com/calidy-com/dayjs-calendarsystems/commit/2d9a8e9b0c5c443040072080edfe748abfef5e9a))


### Bug Fixes

* buildtime issues, add eslintrc ([13b5594](https://github.com/calidy-com/dayjs-calendarsystems/commit/13b5594c71674ebbd29d03a9af8ffd3ac02301b9))
* eslint  errors ([b03995d](https://github.com/calidy-com/dayjs-calendarsystems/commit/b03995d06541f8bbc62296e75037f4af0c9e6d96))
* typo in function brackets ([595d119](https://github.com/calidy-com/dayjs-calendarsystems/commit/595d1193c9cedeeaee39b9ae6c617dba6bcd338a))
* update babel build config ([7d448cb](https://github.com/calidy-com/dayjs-calendarsystems/commit/7d448cbe6d95f40ad0e32d69eacf5bd0698807cc))
