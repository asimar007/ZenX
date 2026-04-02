import { classifyInstant } from "@/utils/classifier";
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
      console.log("[X Feed Filter] Initializing...");

      settings = (await settingsStorage.getValue()) ?? DEFAULT_SETTINGS;

      if (!settings.enabled) {
        console.log("[X Feed Filter] Extension starts disabled");
        // We do not return here. We must start observeFeed() so we can process
        // new tweets if the user enables the extension later.
      }

      if (settings.showFilteredCount) {
        createStatsDisplay();
      }

      observeFeed();
      processExistingTweets();

      console.log("[X Feed Filter] Ready! (Keyword-Only Matcher)");
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

      const result = classifyInstant(text, settings);

      if (result.decision === "hide") {
        hideTweet(
          tweetElement,
          {
            action: "hide",
            category: result.blockCategory ?? null,
            confidence: result.blockScore ?? 0.5,
            method: "keyword",
            matchedKeyword: result.matchedKeyword,
          },
          () => {
            filterStats.filtered--;
            filterStats.shown++;
            updateStatsDisplay(filterStats.filtered);
            scheduleStatsSave();
          },
        );

        filterStats.filtered++;
        updateStatsDisplay(filterStats.filtered);
        scheduleStatsSave();
      } else {
        filterStats.shown++;
      }
    }

    browser.runtime.onMessage.addListener((message: any) => {
      if (message.action !== "settingsUpdated" || !message.settings) return;
      settings = message.settings;

      if (!settings.enabled) {
        cleanupHiddenTweets();
        removeStatsDisplay();
      } else {
        cleanupHiddenTweets();
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
