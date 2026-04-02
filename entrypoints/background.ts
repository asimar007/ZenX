import { settingsStorage, statsStorage } from "@/utils/storage";
import { DEFAULT_SETTINGS, DEFAULT_STATS } from "@/utils/types";
import type { Message, Stats } from "@/utils/types";

export default defineBackground(() => {
  console.log(
    "[X Feed Filter] Background service worker started (Keyword-Only Mode)",
  );

  // Handle messages from content script and popup
  browser.runtime.onMessage.addListener(
    (request: Message, _sender, sendResponse: (response: unknown) => void) => {
      if (request.action === "getStats") {
        statsStorage.getValue().then((stats) => {
          sendResponse({ stats: stats ?? DEFAULT_STATS });
        });
        return true;
      }

      if (request.action === "updateStats") {
        statsStorage.getValue().then(async (current) => {
          const stats: Stats = current ?? { ...DEFAULT_STATS };
          if (request.filtered) stats.filtered++;
          else stats.allowed++;
          stats.total++;
          await statsStorage.setValue(stats);
          sendResponse({ success: true });
        });
        return true;
      }

      if (request.action === "resetStats") {
        statsStorage.setValue({ ...DEFAULT_STATS }).then(() => {
          sendResponse({ success: true });
        });
        return true;
      }
    },
  );

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync" && changes.settings) {
      browser.tabs.query({}).then((tabs) => {
        for (const tab of tabs) {
          if (tab.id) {
            browser.tabs
              .sendMessage(tab.id, {
                action: "settingsUpdated",
                settings: changes.settings.newValue,
              })
              .catch(() => {});
          }
        }
      });
    }
  });

  // Initialize defaults on install
  browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === "install") {
      await statsStorage.setValue({ ...DEFAULT_STATS });
      await settingsStorage.setValue({ ...DEFAULT_SETTINGS });
      browser.tabs.create({ url: browser.runtime.getURL("/onboarding.html") });
    } else {
      await statsStorage.setValue({ ...DEFAULT_STATS });
      const existing = await settingsStorage.getValue();
      if (!existing) {
        await settingsStorage.setValue({ ...DEFAULT_SETTINGS });
      }
    }
  });
});
