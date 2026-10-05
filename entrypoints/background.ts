import { settingsStorage, statsStorage } from "@/utils/storage";
import { DEFAULT_SETTINGS, DEFAULT_STATS } from "@/utils/types";

export default defineBackground(() => {
  // Initialize defaults on install
  browser.runtime.onInstalled.addListener(async (details) => {
    await statsStorage.setValue({ ...DEFAULT_STATS });
    if (details.reason === "install") {
      await settingsStorage.setValue({ ...DEFAULT_SETTINGS });
      browser.tabs.create({ url: browser.runtime.getURL("/onboarding.html") });
    }
  });
});
