import { useState, useEffect } from "react";
import { useSettings } from "../../hooks/useSettings";
import { useStats } from "../../hooks/useStats";
import { Header } from "../../components/Header";
import { StatsBar } from "../../components/StatsBar";
import { CheckboxItem } from "../../components/CheckboxItem";
import { CategoryKeywordList } from "../../components/CategoryKeywordList";
import { CustomKeywordManager } from "../../components/CustomKeywordManager";
import "./style.css";

export default function App() {
  const { settings, updateSettings, saveSettings } = useSettings();
  const { stats, resetStats } = useStats();
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const showStatus = (message: string, type: "success" | "error") => {
    setStatus({ message, type });
  };

  const handleSave = async () => {
    const hasFilter =
      settings.blockPolitics ||
      settings.blockRacism ||
      settings.blockReligion ||
      settings.blockWar ||
      settings.blockControversial ||
      (settings.customKeywords && settings.customKeywords.length > 0);

    if (settings.enabled && !hasFilter) {
      showStatus("Please select at least one filter category", "error");
      return;
    }

    try {
      await saveSettings(settings);
      showStatus("Settings saved! Refresh X/Twitter to apply.", "success");
    } catch {
      showStatus("Error saving settings", "error");
    }
  };

  return (
    <div className="flex flex-col w-[360px] max-h-[600px] overflow-y-auto bg-slate-900 text-slate-100 font-sans shadow-2xl antialiased">
      <Header
        enabled={settings.enabled}
        onToggle={async (v) => {
          updateSettings({ enabled: v });
          await saveSettings({ ...settings, enabled: v });
        }}
      />

      <StatsBar stats={stats} onReset={resetStats} />

      <div className="p-5 flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Filter Categories
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select content types to hide from your feed
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <CheckboxItem
              id="blockPolitics"
              label="🏛️ Political Content"
              checked={settings.blockPolitics}
              onChange={(v) => updateSettings({ blockPolitics: v })}
            >
              {settings.blockPolitics && (
                <CategoryKeywordList
                  categoryName="politics"
                  settings={settings}
                  updateSettings={updateSettings}
                />
              )}
            </CheckboxItem>
            <CheckboxItem
              id="blockRacism"
              label="🚫 Racism & Hate"
              checked={settings.blockRacism}
              onChange={(v) => updateSettings({ blockRacism: v })}
            >
              {settings.blockRacism && (
                <CategoryKeywordList
                  categoryName="racism"
                  settings={settings}
                  updateSettings={updateSettings}
                />
              )}
            </CheckboxItem>
            <CheckboxItem
              id="blockReligion"
              label="⛪ Religious Debates"
              checked={settings.blockReligion}
              onChange={(v) => updateSettings({ blockReligion: v })}
            >
              {settings.blockReligion && (
                <CategoryKeywordList
                  categoryName="religion"
                  settings={settings}
                  updateSettings={updateSettings}
                />
              )}
            </CheckboxItem>
            <CheckboxItem
              id="blockWar"
              label="⚔️ War & Conflict"
              checked={settings.blockWar}
              onChange={(v) => updateSettings({ blockWar: v })}
            >
              {settings.blockWar && (
                <CategoryKeywordList
                  categoryName="war"
                  settings={settings}
                  updateSettings={updateSettings}
                />
              )}
            </CheckboxItem>
            <CheckboxItem
              id="blockControversial"
              label="⚡ Controversial Topics"
              checked={settings.blockControversial}
              onChange={(v) => updateSettings({ blockControversial: v })}
            >
              {settings.blockControversial && (
                <CategoryKeywordList
                  categoryName="controversial"
                  settings={settings}
                  updateSettings={updateSettings}
                />
              )}
            </CheckboxItem>
          </div>
        </section>

        <CustomKeywordManager
          settings={settings}
          updateSettings={updateSettings}
        />

        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Display Options
          </h2>
          <div className="flex flex-col gap-2">
            <CheckboxItem
              id="showFilteredCount"
              label="Show filtered count badge"
              checked={settings.showFilteredCount}
              onChange={(v) => updateSettings({ showFilteredCount: v })}
              className="bg-transparent hover:bg-slate-800/50 p-2"
            />
          </div>
        </section>

        <div className="flex flex-col pt-2 pb-4 mt-2">
          <button
            className="w-full py-3.5 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg border border-blue-400/30 transition-all active:scale-[0.98] transform cursor-pointer"
            onClick={handleSave}
          >
            Save Configuration
          </button>

          <div className="h-6 mt-3 flex items-center justify-center">
            {status && (
              <div
                className={`text-sm font-medium px-3 py-1 rounded-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  status.type === "success"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {status.message}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="py-4 text-center border-t border-slate-800 bg-slate-900/50">
        <p className="text-xs font-medium text-slate-500">
          Made with <span className="text-red-500">❤️</span> for a cleaner feed
        </p>
      </footer>
    </div>
  );
}
