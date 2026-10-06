import { useState, useEffect } from "react";
import { useSettings } from "../../hooks/useSettings";
import { useStats } from "../../hooks/useStats";
import { settingsStorage } from "@/utils/storage";
import { CATEGORIES } from "@/utils/types";
import { Header } from "../../components/Header";
import { StatsBar } from "../../components/StatsBar";
import { CheckboxItem } from "../../components/CheckboxItem";
import { CategoryKeywordList } from "../../components/CategoryKeywordList";
import { CustomKeywordManager } from "../../components/CustomKeywordManager";
import { Icon } from "../../components/Icon";
import "@/assets/tailwind.css";

const sectionTitle = "text-[11px] font-semibold uppercase tracking-[0.08em] text-forest-ink";

export default function App() {
  const { settings, updateSettings, loaded } = useSettings();
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
      CATEGORIES.some((c) => settings[c.toggle]) ||
      settings.customKeywords.length > 0;

    if (settings.enabled && !hasFilter) {
      showStatus("Select at least one category or add a keyword", "error");
      return;
    }

    try {
      await settingsStorage.setValue(settings);
      showStatus("Saved. Open X tabs update automatically.", "success");
    } catch {
      showStatus("Couldn't save settings. Try again.", "error");
    }
  };

  // Render only after stored settings load, so the switch never shows the default "Active".
  if (!loaded) return <div className="w-90 h-150 bg-cream-paper" />;

  return (
    <div className="flex flex-col w-90 max-h-150 overflow-y-auto bg-cream-paper text-charcoal">
      <Header
        enabled={settings.enabled}
        onToggle={async (v) => {
          updateSettings({ enabled: v });
          await settingsStorage.setValue({ ...settings, enabled: v });
        }}
      />

      <StatsBar stats={stats} onReset={resetStats} />

      <main className="px-4 pt-6 pb-5 flex flex-col gap-7">
        <section className="flex flex-col gap-3">
          <div>
            <h2 className={sectionTitle}>Filters</h2>
            <p className="mt-1 text-xs text-charcoal/70">Choose what stays out of your feed.</p>
          </div>

          <div className="flex flex-col gap-2">
            {CATEGORIES.map((c) => (
              <CheckboxItem
                key={c.toggle}
                icon={c.icon}
                label={c.label}
                meta={`${settings[c.keywords].length} keywords`}
                checked={settings[c.toggle]}
                onChange={(v) => updateSettings({ [c.toggle]: v })}
              >
                {settings[c.toggle] && (
                  <CategoryKeywordList
                    categoryName={c.id}
                    settings={settings}
                    updateSettings={updateSettings}
                  />
                )}
              </CheckboxItem>
            ))}
            <CustomKeywordManager
              settings={settings}
              updateSettings={updateSettings}
            />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className={sectionTitle}>Display</h2>
          <CheckboxItem
            icon="eye"
            label="Show filtered count badge"
            meta="Small counter in the corner of X"
            checked={settings.showFilteredCount}
            onChange={(v) => updateSettings({ showFilteredCount: v })}
          />
        </section>

        <a
          href="https://zenx.asimsk.site"
          target="_blank"
          rel="noreferrer"
          className="self-center text-xs text-charcoal/70 hover:text-forest-ink underline-offset-2 hover:underline"
        >
          zenx.asimsk.site
        </a>
      </main>

      <div className="sticky bottom-0 px-4 pt-3 pb-4 bg-cream-paper border-t border-border-mist">
        <div role="status" aria-live="polite" className="empty:hidden mb-2.5">
          {status && (
            <p
              className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${
                status.type === "success"
                  ? "bg-keylime-wash text-forest-ink"
                  : "bg-border-mist text-charcoal"
              }`}
            >
              <Icon name={status.type === "success" ? "shieldCheck" : "ban"} className="size-3.5" />
              {status.message}
            </p>
          )}
        </div>
        <button
          type="button"
          className="group w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-forest-ink text-cream-paper text-sm hover:bg-forest-shadow active:scale-[0.99] transition-[background-color,transform] duration-200 cursor-pointer"
          onClick={handleSave}
        >
          Save changes
          <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
