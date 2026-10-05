import { CATEGORIES } from "./types";
import type { Settings } from "./types";

export interface Match {
  category: string;
  keyword: string;
}

/**
 * Keyword-based classification. Returns the match to hide the tweet for, or null to show it.
 * Custom keywords win; otherwise the category with the most matching keywords (capped at 4, earlier category wins ties).
 */
export function classify(text: string, settings: Settings): Match | null {
  for (const keyword of settings.customKeywords) {
    // Escape special characters in the custom keyword just in case
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`\\b${escapedKeyword}\\b`, "i").test(text)) {
      return { category: "custom", keyword };
    }
  }

  let best: Match | null = null;
  let bestCount = 0;

  for (const { id, toggle, keywords } of CATEGORIES) {
    if (!settings[toggle]) continue;

    const matches = settings[keywords].filter((keyword) =>
      new RegExp(`\\b${keyword}\\b`, "i").test(text),
    );
    const count = Math.min(matches.length, 4);
    if (count > bestCount) {
      bestCount = count;
      best = { category: id, keyword: matches[0] };
    }
  }

  return best;
}
