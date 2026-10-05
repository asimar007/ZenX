import { classify } from "@/utils/classifier";
import { settingsStorage, statsStorage } from "@/utils/storage";
import { DEFAULT_SETTINGS } from "@/utils/types";
import type { Settings } from "@/utils/types";
import { extractTweetText } from "@/utils/dom";
import {
  createStatsDisplay,
  updateStatsDisplay,
  removeStatsDisplay,
} from "@/components/StatsDisplay";
import { hideTweet } from "@/components/HiddenTweetOverlay";
import "@/assets/content.css";

export default defineContentScript({
  matches: ["https://twitter.com/*", "https://x.com/*"],
  runAt: "document_idle",

  main() {
    // ============================================
    // State
    // ============================================
    let settings: Settings = { ...DEFAULT_SETTINGS };
    let processedTweets = new WeakSet<Element>();
    const filterStats = { filtered: 0, shown: 0 };
    let statsSaveTimer: ReturnType<typeof setTimeout> | null = null;

    function scheduleStatsSave() {
      if (statsSaveTimer) clearTimeout(statsSaveTimer);
      statsSaveTimer = setTimeout(() => {
        statsStorage.setValue({
          filtered: filterStats.filtered,
          allowed: filterStats.shown,
          total: filterStats.filtered + filterStats.shown,
        });
        statsSaveTimer = null;
      }, 500);
    }

    // ============================================
    // Initialization
    // ============================================

    async function init() {
      settings = await settingsStorage.getValue();

      if (settings.showFilteredCount) {
        createStatsDisplay();
      }

      // Observe even when disabled so new tweets get processed once re-enabled.
      observeFeed();
      processExistingTweets();
    }

    // ============================================
    // Tweet processing
    // ============================================

    function cleanupHiddenTweets() {
      document.querySelectorAll(".xfeed-tweet-hidden").forEach((el) => {
        el.classList.remove("xfeed-tweet-hidden");
      });
      document
        .querySelectorAll(".xfeed-hidden-tweet")
        .forEach((el) => el.remove());
    }

    function observeFeed() {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue;
            const el = node as HTMLElement;

            const tweets =
              el.querySelectorAll?.('article[data-testid="tweet"]') ?? [];
            tweets.forEach((tweet) => processTweet(tweet as HTMLElement));

            if (el.matches?.('article[data-testid="tweet"]')) {
              processTweet(el);
            }
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }

    function processExistingTweets() {
      document
        .querySelectorAll<HTMLElement>('article[data-testid="tweet"]')
        .forEach(processTweet);
    }

    function processTweet(tweetElement: HTMLElement) {
      if (!settings.enabled) return;
      if (processedTweets.has(tweetElement)) return;
      processedTweets.add(tweetElement);

      const text = extractTweetText(tweetElement);
      if (!text || text.length < 10) return;

      const match = classify(text, settings);

      if (match) {
        hideTweet(tweetElement, match, () => {
          filterStats.filtered--;
          filterStats.shown++;
          updateStatsDisplay(filterStats.filtered);
          scheduleStatsSave();
        });

        filterStats.filtered++;
        updateStatsDisplay(filterStats.filtered);
        scheduleStatsSave();
      } else {
        filterStats.shown++;
      }
    }

    settingsStorage.watch((newSettings) => {
      settings = newSettings;
      cleanupHiddenTweets();

      if (!settings.enabled) {
        removeStatsDisplay();
      } else {
        processedTweets = new WeakSet<Element>();
        if (settings.showFilteredCount) createStatsDisplay();
        else removeStatsDisplay();
        processExistingTweets();
      }
    });

    // Start
    init();
  },
});
