<div  align="center">

<img  src="public/icon/ZenX.png"  alt="ZenX Preview"  width="100%"  />

<br/>

<br/>

# ZenX — Your Twitter Feed, Filtered Your Way

**ZenX** is a free, open-source browser extension that silently removes toxic, political, and controversial tweets from your X (Twitter) feed — so you can scroll with peace of mind.

<br/>

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

[🌐 Website](https://zenx.asimsk.site) · [📦 GitHub](https://github.com/asimar007/ZenX) · [🐛 Report Bug](https://github.com/asimar007/ZenX/issues) · [✨ Request Feature](https://github.com/asimar007/ZenX/issues)

</div>

---

## Why ZenX?

Twitter can be overwhelming — politics, hate speech, war news, and controversy flood your feed every day. ZenX quietly filters that noise out, giving you back a cleaner, calmer timeline without muting hundreds of accounts or keywords manually.

> **ZenX works in the background. You don't notice it — until you realize your feed finally feels peaceful.**

---

## Features

### Content Filters

- 🗳️ **Political Filter** — Removes tweets about elections, politicians & political movements

- 🚫 **Hate Speech Filter** — Blocks racist, bigoted, and discriminatory content

- 🕌 **Religious Debate Filter** — Filters out religious arguments, extremism & controversy

- 💣 **War & Conflict Filter** — Hides tweets about ongoing wars, military strikes & conflicts

- 🔥 **Controversial Topics Filter** — Removes abortion, gun control, cancel culture & more

- ✏️ **Custom Keywords** — Add your own words/phrases to block exactly what you want

### User Experience

- 📊 **Live Stats** — See how many tweets were filtered vs. allowed in real time

- 🔄 **Real-time Sync** — Settings sync across all your devices via Chrome Sync

- 👁️ **Peek Mode** — Reveal any filtered tweet with a single click

- 🌙 **Dark Mode** — Adapts seamlessly to X's light, dark, and dim themes

- 🧩 **Onboarding Wizard** — Clean first-run setup — pick your filters and go in seconds

- 🔒 **100% Local** — All filtering happens in your browser. No servers, no data collection.

---

## How It Works

ZenX runs a lightweight content script on `x.com` that:

1.  **Watches** your feed in real time using a `MutationObserver`

2.  **Extracts** tweet text, quoted tweets, and embedded card content

3.  **Scores** each tweet against your active keyword categories using regex matching

4.  **Hides** matched tweets behind a shield overlay (`🛡️ Filtered — reason`)

5.  **Logs** stats to local storage and updates the live counter badge

All filtering happens **100% locally in your browser**. No data is ever sent to any server.

---

## Installation

> ZenX is not yet on the Chrome Web Store.

**Easiest way — no terminal needed:**

1. Download `zenx-1.0.0.zip` from [GitHub Releases](https://github.com/asimar007/ZenX/releases/tag/v1.0.0)
2. Unzip it anywhere on your computer
3. Open `chrome://extensions` → enable **Developer Mode** → click **"Load unpacked"** → select the unzipped folder

**Full guide (Chrome, Firefox, build from source, updating, troubleshooting): [INSTALLATION.md](INSTALLATION.md)**

---

## Usage

### Popup Controls

#### Toggle Extension

Click the switch in the header to enable or disable filtering without changing your settings.

#### Filter Categories

Check or uncheck each category. Expand any category to view or edit individual keywords.

#### Custom Keywords

Type a word or phrase and press Enter to add it to your personal blocklist.

#### Stats Bar

See how many tweets were filtered vs. allowed. Click reset to start fresh.

---

## Development

```bash
# Start dev server with hot reload

bun  run  dev

# Firefox dev mode

bun  run  dev:firefox

# Type check only (no emit)

bun  run  compile

# Create distributable zip

bun  run  zip
bun  run  zip:firefox
```

Hot reload is handled by WXT — changes to popup or content scripts apply instantly without re-loading the extension.

---
