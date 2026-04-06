# ZenX — Installation Guide

> ZenX is not yet published on the Chrome Web Store. You can install it in two ways — **download the zip** (recommended, no setup needed) or **build from source**.

---

## Table of Contents

- [Method 1 — Download from GitHub Releases (Recommended)](#method-1--download-from-github-releases-recommended)
- [Method 2 — Build from Source](#method-2--build-from-source)
- [Firefox Installation](#firefox-installation)
- [Updating ZenX](#updating-zenx)
- [Uninstalling ZenX](#uninstalling-zenx)
- [Troubleshooting](#troubleshooting)

---

## Method 1 — Download from GitHub Releases (Recommended)

No Git, no terminal, no build tools required.

### Step 1 — Download the Zip

Go to the latest release and download the zip file:

**[github.com/asimar007/ZenX/releases/tag/v1.0.0](https://github.com/asimar007/ZenX/releases/tag/v1.0.0)**

Download the file named `zenx-1.0.0.zip`.

### Step 2 — Unzip It

Extract the zip anywhere on your computer — for example your Desktop or Downloads folder. You will get a folder with the extension files inside.

### Step 3 — Open Chrome Extensions Page

Open a new tab and go to:

```text
chrome://extensions
```

Or: **Menu (⋮) → More Tools → Extensions**

### Step 4 — Enable Developer Mode

In the top-right corner of the Extensions page, toggle on **Developer Mode**.

```
┌─────────────────────────────────────────┐
│  Extensions              Developer mode ●│
└─────────────────────────────────────────┘
```

### Step 5 — Load the Extension

1. Click **"Load unpacked"** (appears after enabling Developer Mode)
2. Select the **unzipped folder** from Step 2
3. Click **"Select Folder"**

ZenX will appear in your extensions list.

### Step 6 — Pin ZenX to Your Toolbar

1. Click the **puzzle piece icon** (🧩) in the Chrome toolbar
2. Find **ZenX** in the list
3. Click the **pin icon** (📌) next to it

Done — visit [x.com](https://x.com) and ZenX is active.

---

## Method 2 — Build from Source

Use this if you want to run the latest code from the repository.

### Prerequisites

| Tool | Purpose | Install |
| --- | --- | --- |
| **Git** | Clone the repository | [git-scm.com](https://git-scm.com) |
| **Bun** | Install dependencies & build | `curl -fsSL https://bun.sh/install \| bash` |
| **Chrome / Brave / Edge** | Run the extension | Any Chromium-based browser |

### Steps

```bash
# Clone the repository
git clone https://github.com/asimar007/ZenX.git
cd ZenX

# Install dependencies
bun install

# Build the extension
bun run build
```

This produces a `.output/chrome-mv3/` folder. Then follow **Steps 3–6** from Method 1 above, selecting `.output/chrome-mv3/` as the folder to load.

---

## Firefox Installation

Firefox requires building from source.

```bash
git clone https://github.com/asimar007/ZenX.git
cd ZenX
bun install
bun run build:firefox
```

This produces a `.output/firefox-mv2/` folder.

1. Open a new tab and go to `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on..."**
3. Navigate into `.output/firefox-mv2/` and select any file (e.g. `manifest.json`)

> **Note:** Temporary add-ons in Firefox are removed when the browser restarts. You will need to reload it each session until ZenX is published on Firefox Add-ons.

---

## Updating ZenX

### If you installed via zip (Method 1)

1. Go to [github.com/asimar007/ZenX/releases](https://github.com/asimar007/ZenX/releases)
2. Download the zip from the latest release
3. Unzip and replace the old folder contents
4. Go to `chrome://extensions` and click the **refresh icon** (🔄) on the ZenX card

### If you installed via source (Method 2)

```bash
cd ZenX
git pull origin main
bun install
bun run build
```

Then go to `chrome://extensions` and click the **refresh icon** (🔄) on the ZenX card.

---

## Uninstalling ZenX

### Chrome

1. Go to `chrome://extensions`
2. Find **ZenX** and click **"Remove"**
3. Confirm the prompt

### Firefox

1. Go to `about:addons`
2. Find **ZenX** under Extensions
3. Click the **three-dot menu (⋯)** → **Remove**

---

## Need Help?

- Open an issue: [github.com/asimar007/ZenX/issues](https://github.com/asimar007/ZenX/issues)
- Visit the landing page: [zenx.asimsk.site](https://zenx.asimsk.site)
