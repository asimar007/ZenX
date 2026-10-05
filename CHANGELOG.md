# Changelog

All notable changes to ZenX will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-10-05

### Added
- Category icons for every filter, replacing emoji
- Custom Keywords card in the Filters list, styled like the built-in categories
- Keyword chips on a dedicated panel, sorted shortest first
- Scanned-tweet count next to the filtered count in the popup
- Links to [zenx.asimsk.site](https://zenx.asimsk.site) from the popup and onboarding page

### Changed
- Redesigned popup, onboarding page, and in-feed UI to match the ZenX website: cream and botanical-green palette, Inter and Cormorant Garamond (bundled with the extension, no external font requests)
- Hidden tweets now show "Tweet hidden by ZenX" with a category · keyword tag and a **Reveal** button (was **Show**)
- Popup keeps the **Save changes** button pinned to the bottom and shows an Active / Paused label next to the main switch
- Open X tabs read setting changes directly from storage instead of waiting for a background broadcast
- Settings and stats use WXT's storage API; keyword matching was simplified with identical results

### Removed
- Unused background message handlers and notification styles
- `@types/chrome` dev dependency

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
