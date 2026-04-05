# Changelog

All notable changes to ZenX will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-04-03

### Added
- Initial public release of ZenX
- Political filter — removes tweets about elections, politicians & political movements
- Hate speech filter — blocks racist, bigoted, and discriminatory content
- Religious debate filter — filters out religious arguments, extremism & controversy
- War & conflict filter — hides tweets about ongoing wars, military strikes & conflicts
- Controversial topics filter — removes abortion, gun control, cancel culture & more
- Custom keywords — add personal words/phrases to block
- Live stats — real-time counter of filtered vs. allowed tweets
- Real-time sync — settings sync across devices via Chrome Sync
- Peek mode — reveal any filtered tweet with a single click
- Dark mode — adapts to X's light, dark, and dim themes
- Onboarding wizard — first-run setup to pick filters
- Dynamic extension toggle — enable/disable without changing settings
- Broadcast setting changes to all open tabs
- Chrome MV3 and Firefox MV2 support

### Changed
- Renamed project from tweet-filter to ZenX

---

## [0.1.0] - 2026-03-23

### Added
- Project prototype with WXT + React scaffold
- Tailwind CSS integration
- Basic keyword-based tweet filtering via MutationObserver
- Local storage for filter stats
